import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ProfileGuardService {

  constructor(private router: Router) {}

	canActivate(): boolean {
		if (!localStorage.getItem('account.email')) {
			this.router.navigate(['login']);
			
      		return false;
		}

		return true;
	}

}
