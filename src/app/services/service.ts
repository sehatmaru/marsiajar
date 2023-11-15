import { HttpHeaders, HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, timeout, retry, of } from 'rxjs';
import { Utils } from '../utils/utils';
import { HandlerResponseService } from './handler-response.service';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Service {
  headers: HttpHeaders | undefined;
  bodyUrl: URLSearchParams | undefined;

  constructor(
    private http: HttpClient,
    private handlerResponseService: HandlerResponseService,
    private storageService: StorageService,
    private utils: Utils) {
  }

  getHeaders(headers?: any): HttpHeaders {

    const headerObj: any = {
      Authorization: 'Bearer ' + this.storageService.getToken(),
      SameSite: 'strict'
    };
    if (headers) {
      headers.forEach((value: string, key: string) => {
        headerObj[key] = value;
      });
    }

    return this.headers = new HttpHeaders(headerObj);

  }

  getSearchParams(body: any): URLSearchParams {

    const bodyUrl = new Map();
    const newBody: any = {};

    // tslint:disable-next-line: forin
    for (const param in body) {
      if (Array.isArray(body[param])) {

        body[param].forEach((value: any, key: string) => {
          // tslint:disable-next-line: forin
          for (const item in value) {
            const obj = typeof value[item] === 'boolean' ? `${param}[${key}][${item}]` : `${param}[${key}][${item}][value]`;
            bodyUrl.set(obj, value[item]);
          }
        });

      } else {
        bodyUrl.set(param, body[param]);
      }
    }

    bodyUrl.forEach((value: any, key: string) => {
      newBody[key] = value;
    });

    return this.bodyUrl = new URLSearchParams(newBody);

  }

  get(url: string, params?: any, reqOpts?: any): boolean | Observable<any> {

    if (this.checkConnection()) {

      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }

      if (params) {

        reqOpts.params = new HttpParams();

        // tslint:disable-next-line: forin
        for (const reqParams in params) {
          reqOpts.params = reqOpts.params.set(reqParams, params[reqParams]);
        }

      }

      if (this.storageService.getToken()) {
        reqOpts.headers = this.getHeaders();
      }

      reqOpts.withCredentials = true;
      return this.http.get<any>(environment.baseURL + url, reqOpts)
        .pipe(
          catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              // this.utils.hideLoading();
              this.handlerResponseService.failedResponse(error);
              throw error;
            }
          ),
        );

    } else {
      return false;
    }

  }

  // tslint:disable-next-line: max-line-length
  post(url: string, body: any, reqOpts?: any, searchParam?: any, isNeedError?: boolean, maxRetry?: number, reqTimeout?: number): boolean | Observable<any> {

    if (this.checkConnection()) {
      if (reqOpts) {
        reqOpts.withCredentials = true;
      } else {
        reqOpts = {
          withCredentials: true
        };
      }

      if (this.storageService.getToken()) {
        reqOpts.headers = this.getHeaders(reqOpts.headers);
      }

      if (searchParam) {
        const bodyUrl = this.getSearchParams(searchParam).toString();
        body = body ? body.concat(bodyUrl) : bodyUrl;
      }

      console.log(reqOpts);
      return this.http.post<any>(environment.baseURL + url, body, reqOpts)
        .pipe(
          timeout(reqTimeout ? reqTimeout : 300000),
          retry(maxRetry ? maxRetry : 0),
          catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              // this.utils.hideLoading();
              this.handlerResponseService.failedResponse(error);
              if (isNeedError) {
                return of(error);
              } else {
                throw error;
              }
            }
          ),
        );

    } else {
      return false;
    }

  }

  // tslint:disable-next-line: max-line-length
  patch(url: string, body: any, reqOpts?: any, params?: any, isNeedError?: boolean, maxRetry?: number, reqTimeout?: number): boolean | Observable<any> {

    if (this.checkConnection()) {
      if (reqOpts) {
        reqOpts.withCredentials = true;
      } else {
        reqOpts = {
          withCredentials: true
        };
      }

      if (this.storageService.getToken()) {
        reqOpts.headers = this.getHeaders(reqOpts.headers);
      }

      if (params) {
        reqOpts.params = new HttpParams();
        // tslint:disable-next-line: forin
        for (const reqParams in params) {
          reqOpts.params = reqOpts.params.set(reqParams, params[reqParams]);
        }
      }

      return this.http.patch<any>(environment.baseURL + url, body, reqOpts)
        .pipe(
          timeout(reqTimeout ? reqTimeout : 300000),
          retry(maxRetry ? maxRetry : 0),
          catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              // this.utils.hideLoading();
              this.handlerResponseService.failedResponse(error);
              if (isNeedError) {
                return of(error);
              } else {
                throw error;
              }
            }
          ),
        );

    } else {
      return false;
    }

  }

  put(url: string, body: any, reqOpts?: any): boolean | Observable<any> {

    if (this.checkConnection()) {

      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }

      if (this.storageService.getToken()) {
        reqOpts.headers = this.getHeaders();
      }

      return this.http.put<any>(environment.baseURL + url, body, reqOpts)
        .pipe(
          catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              this.handlerResponseService.failedResponse(error);
              throw error;
            }
          ),
        );

    } else {
      return false;
    }

  }

  delete(url: string, bodyData?: any, reqOpts?: any): boolean | Observable<any> {

    if (this.checkConnection()) {

      if (reqOpts) {
        reqOpts.withCredentials = true;
      } else {
        reqOpts = {
          withCredentials: true
        };
      }

      if (this.storageService.getToken()) {
        reqOpts.body = bodyData;
        reqOpts.headers = this.getHeaders();
      }

      return this.http.delete<any>(environment.baseURL + url, reqOpts)
        .pipe(
          catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              // this.utils.hideLoading();
              this.handlerResponseService.failedResponse(error);
              throw error;
            }
          ),
        );

    } else {
      return false;
    }
  }

  checkConnection(): boolean {
    return navigator.onLine;
  }

}
