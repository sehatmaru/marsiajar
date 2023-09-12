import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private authService: AuthService,
    private storageService: StorageService,
    private utils: Utils,
    private router: Router) {
    super();
  }

  doLogout() {
    this.authService.logout().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.removeLogged()
          this.router.navigateByUrl('login');
        }

        this.utils.toast(resp.message, resp.statusCode)
      },
      error: (error) => {
        this.utils.error(error.message)
      }
    });
  }
}
