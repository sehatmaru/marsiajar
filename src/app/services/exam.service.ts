import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from '../interface/common.interface';
import { Service } from './service';
import { ExamListResponseModel, ExamTncResponseModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private root = 'exam';
  
  constructor(private commonApi: Service) { }

  getList(title: string, category: string, status: string): Observable<CommonResponsei<ExamListResponseModel[]>> {
    return this.commonApi.get(`${this.root}/list?title=${title}&categorySecureId=${category}&status=${status}`) as Observable<CommonResponsei<ExamListResponseModel[]>>;
  }

  getExamTnc(secureId: string): Observable<CommonResponsei<ExamTncResponseModel>> {
    return this.commonApi.get(`${this.root}/apply/tnc?examSecureId=${secureId}`) as Observable<CommonResponsei<ExamTncResponseModel>>;
  }

  applyExam(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/apply?examSecureId=${secureId}`, null) as Observable<CommonResponsei<Boolean>>;
  }

}
