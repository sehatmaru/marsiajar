import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from '../interface/common.interface';
import { Service } from './service';
import { ExamListResponseModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private root = 'exam';
  
  constructor(private commonApi: Service) { }

  getList(title: string, category: string): Observable<CommonResponsei<ExamListResponseModel[]>> {
    return this.commonApi.get(`${this.root}/list?title=${title}&categorySecureId=${category}`) as Observable<CommonResponsei<ExamListResponseModel[]>>;
  }

}
