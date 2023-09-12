import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { LoginRequestModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Utils } from 'src/app/utils/utils';

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
