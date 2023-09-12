import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCode } from '../../enum/status-code.enum';
import { LoginRequestModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Utils } from '../../utils/utils';
import { RegisterTypeEnum } from '../../enum/register-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public email = ''
  public password = ''

  public isLoading = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.isLoading = true

    const bodyRequest = new LoginRequestModel()
    bodyRequest.password = this.password
    bodyRequest.email = this.email
    bodyRequest.type = RegisterTypeEnum.EMAIL.toString();

    this.authService.doLogin(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.setLogin(
            resp.result.secureId,
            resp.result.email,
            resp.result.accessToken
          )

          this.router.navigateByUrl('');
        }

        this.utils.toast(resp.message, resp.statusCode)
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
        this.isLoading = false
      }
   });
  }

  toForgotPassword() {
    this.router.navigateByUrl('forgot-password')
  }

  isValid(): boolean {
    return this.email != '' && this.password != ''
  }

}
