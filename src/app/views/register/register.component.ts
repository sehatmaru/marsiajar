import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCode } from '../../enum/status-code.enum';
import { RegisterRequestModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public email = ''
  public firstName = ''
  public lastName = ''
  public password = ''
  public rePassword = ''

  public isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  doRegister() {
    this.isLoading = true

    const bodyRequest = new RegisterRequestModel()
    bodyRequest.password = this.password
    bodyRequest.email = this.email
    bodyRequest.firstName = this.firstName
    bodyRequest.lastName = this.lastName

    this.authService.doRegister(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.router.navigateByUrl('/login');
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
      && this.lastName != '' && this.rePassword != ''
      && this.firstName != '' && (this.password === this.rePassword)
  }

}
