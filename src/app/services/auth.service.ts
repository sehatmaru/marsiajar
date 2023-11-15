import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequestModel, EditProfileRequestModel, ForgotPasswordRequestModel, LoginRequestModel, LoginResponseModel, RegisterRequestModel, RegisterResponseModel, ResetPasswordRequestModel, VerifyOtpRequestModel } from '../models/auth.model';
import { CommonResponsei } from '../interface/common.interface';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private root = 'auth';
  constructor(private commonApi: Service) { }

  doLogin(bodyRequest: LoginRequestModel): Observable<CommonResponsei<LoginResponseModel>> {
    return this.commonApi.post(`${this.root}/login/consumer`, bodyRequest) as Observable<any>;
  }

  doRegister(bodyRequest: RegisterRequestModel): Observable<CommonResponsei<RegisterResponseModel>> {
    return this.commonApi.post(`${this.root}/register`, bodyRequest) as Observable<any>;
  }

  getProfile(): Observable<CommonResponsei<LoginResponseModel>> {
    return this.commonApi.get(`${this.root}/profile`) as Observable<any>;
  }

  editProfile(bodyRequest: EditProfileRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/edit-profile`, bodyRequest) as Observable<any>;
  }

  changePassword(bodyRequest: ChangePasswordRequestModel): Observable<CommonResponsei<LoginResponseModel>> {
    return this.commonApi.post(`${this.root}/change-password`, bodyRequest) as Observable<any>;
  }

  logout(): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/logout`, null) as Observable<any>;
  }

  verifyOtp(bodyRequest: VerifyOtpRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/otp/verify`, bodyRequest) as Observable<any>;
  }

  forgotPassword(bodyRequest: ForgotPasswordRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/password/forgot`, bodyRequest) as Observable<any>;
  }

  resetPassword(bodyRequest: ResetPasswordRequestModel): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.post(`${this.root}/password/reset`, bodyRequest) as Observable<any>;
  }

  resendOtp(): Observable<CommonResponsei<Boolean>> {
    return this.commonApi.get(`${this.root}/otp/resend`) as Observable<any>;
  }
}
