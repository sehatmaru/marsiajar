import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from '../interface/common.interface';
import { CommonService } from './common.service';
import { RoleEnum } from '../enum/role.enum';
import { AddUpdateAdminRequestModel, AddUpdateBenefitRequestModel, AddUpdateCategoryRequestModel, AddUpdateCourseRequestModel, AddUpdateExamRequestModel, AddUpdateQuestionRequestModel, AddUpdateTemplateRequestModel, AddUpdateWebinarRequestModel, BenefitResponseModel, CategoryResponseModel, CourseResponseModel, ExamListResponseModel, ExamResponseModel, InvoiceListRequestModel, InvoiceListResponseModel, QuestionResponseModel, TemplateResponseModel, UpdateUserRequestModel, UserRequestModel, UserResponseModel, WebinarResponseModel } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private root = 'admin';
  private USER = 'user';
  private TEMPLATE = 'template';
  private WEBINAR = 'webinar';
  private COURSE = 'course';
  private QUESTION = 'question';
  private BENEFIT = 'benefit';
  private EXAM = 'exam';
  private INVOICE = 'invoice';
  private CATEGORY = 'category';
  
  constructor(private commonApi: CommonService) { }

  getUserList(role: RoleEnum, requestBody: UserRequestModel): Observable<CommonResponsei<UserResponseModel[]>> {
    const params = 'role=' + RoleEnum[role]
      + '&name=' + requestBody.name
      + '&email=' + requestBody.email
      + '&registrationType=' + requestBody.type
      + '&status=' + requestBody.active

    return this.commonApi.get(`${this.root}/${this.USER}/list?${params}`) as Observable<CommonResponsei<UserResponseModel[]>>;
  }

  addUser(requestBody: AddUpdateAdminRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.USER}/add`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateUser(secureId: string, requestBody: UpdateUserRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.USER}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteUser(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.USER}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  toggleUserStatus(secureId: string, status: boolean): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.get(`${this.root}/${this.USER}/status/toggle?secureId=${secureId}&status=${status}`) as Observable<CommonResponsei<Boolean>>;
  }

  getTemplateList(name: string): Observable<CommonResponsei<TemplateResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.TEMPLATE}/list?name=${name}`) as Observable<CommonResponsei<TemplateResponseModel[]>>;
  }

  saveTemplate(requestBody: AddUpdateTemplateRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.TEMPLATE}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateTemplate(secureId: string, requestBody: AddUpdateTemplateRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.TEMPLATE}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteTemplate(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.TEMPLATE}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  getWebinarList(title: string, status: string, category: string): Observable<CommonResponsei<WebinarResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.WEBINAR}/list?title=${title}&status=${status}&categorySecureId=${category}`) as Observable<CommonResponsei<WebinarResponseModel[]>>;
  }

  saveWebinar(requestBody: AddUpdateWebinarRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.WEBINAR}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateWebinar(secureId: string, requestBody: AddUpdateWebinarRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.WEBINAR}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteWebinar(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.WEBINAR}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  detailWebinar(secureId: string): Observable<CommonResponsei<WebinarResponseModel>> {
    return this.commonApi.get(`${this.root}/${this.WEBINAR}/detail?secureId=${secureId}`) as Observable<CommonResponsei<WebinarResponseModel>>;
  }

  getCourseList(title: string, category: string): Observable<CommonResponsei<CourseResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.COURSE}/list?title=${title}&categorySecureId=${category}`) as Observable<CommonResponsei<CourseResponseModel[]>>;
  }

  saveCourse(requestBody: AddUpdateCourseRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.COURSE}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateCourse(secureId: string, requestBody: AddUpdateCourseRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.COURSE}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteCourse(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.COURSE}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  getQuestionList(content: string, category: string): Observable<CommonResponsei<QuestionResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.QUESTION}/list?content=${content}&categorySecureId=${category}`) as Observable<CommonResponsei<QuestionResponseModel[]>>;
  }

  saveQuestion(requestBody: AddUpdateQuestionRequestModel[]): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.QUESTION}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  detailQuestion(secureId: string): Observable<CommonResponsei<QuestionResponseModel>> {
    return this.commonApi.get(`${this.root}/${this.QUESTION}/detail?secureId=${secureId}`) as Observable<CommonResponsei<QuestionResponseModel>>;
  }

  updateQuestion(secureId: string, requestBody: AddUpdateQuestionRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.QUESTION}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteQuestion(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.QUESTION}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  getBenefitList(name: string): Observable<CommonResponsei<BenefitResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.BENEFIT}/list?name=${name}`) as Observable<CommonResponsei<BenefitResponseModel[]>>;
  }

  saveBenefit(requestBody: AddUpdateBenefitRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.BENEFIT}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateBenefit(secureId: string, requestBody: AddUpdateBenefitRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.BENEFIT}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteBenefit(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.BENEFIT}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  getCategoryList(name: string): Observable<CommonResponsei<CategoryResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.CATEGORY}/list?title=${name}`) as Observable<CommonResponsei<CategoryResponseModel[]>>;
  }

  saveCategory(requestBody: AddUpdateCategoryRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.CATEGORY}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateCategory(secureId: string, requestBody: AddUpdateCategoryRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.CATEGORY}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  deleteCategory(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.CATEGORY}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  saveExam(requestBody: AddUpdateExamRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/${this.EXAM}/create`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  updateExam(secureId: string, requestBody: AddUpdateExamRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.put(`${this.root}/${this.EXAM}/update?secureId=${secureId}`, requestBody) as Observable<CommonResponsei<Boolean>>;
  }

  detailExam(secureId: string): Observable<CommonResponsei<ExamResponseModel>> {
    return this.commonApi.get(`${this.root}/${this.EXAM}/detail?secureId=${secureId}`) as Observable<CommonResponsei<ExamResponseModel>>;
  }

  getExamList(title: string, category: string, status: string): Observable<CommonResponsei<ExamListResponseModel[]>> {
    return this.commonApi.get(`${this.root}/${this.EXAM}/list?title=${title}&categorySecureId=${category}&status=${status}`) as Observable<CommonResponsei<ExamListResponseModel[]>>;
  }

  deleteExam(secureId: string): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.delete(`${this.root}/${this.EXAM}/delete?secureId=${secureId}`) as Observable<CommonResponsei<Boolean>>;
  }

  getInvoiceList(requestBody: InvoiceListRequestModel): Observable<CommonResponsei<InvoiceListResponseModel[]>> {
    const params = 'status=' + requestBody.status
    + '&customerName=' + requestBody.customerName
    + '&invoiceId=' + requestBody.invoiceId
    + '&category=' + requestBody.category

  return this.commonApi.get(`${this.root}/${this.INVOICE}/list?${params}`) as Observable<CommonResponsei<InvoiceListResponseModel[]>>;
  }
}
