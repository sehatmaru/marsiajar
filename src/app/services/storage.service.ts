import { Injectable } from '@angular/core';

const ID = 'account.secureId';
const EMAIL = 'account.email';
const TOKEN = 'account.token';
const TEMPORARY_TOKEN = 'account.temporaryToken';
const FORGOT = 'account.forgot';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  	public setLogin(secureId: string, email: string, accessToken: string) {
		localStorage.setItem(ID, secureId);
		localStorage.setItem(EMAIL, email);
		localStorage.setItem(TOKEN, accessToken);
	}

	public setTemporaryToken(temporaryToken: string) {
		localStorage.setItem(TEMPORARY_TOKEN, temporaryToken)
	}

	public setForgot() {
		localStorage.setItem(FORGOT, 'yes')
	}

	public removeForgot() {
		localStorage.removeItem(FORGOT)
	}

	public removeLogged() {
		localStorage.removeItem(ID);
		localStorage.removeItem(EMAIL);
		localStorage.removeItem(TOKEN);
	}

	public isLogged() {
		return localStorage.getItem(EMAIL) != null;
	}

	public getSecureId() {
		return localStorage.getItem(ID) ?? '';
	}

	public getEmail() {
		return localStorage.getItem(EMAIL) ?? '';
	}

	public getToken() {
		if (this.getTemporaryToken() != '') return this.getTemporaryToken() ?? ''
		else return localStorage.getItem(TOKEN) ?? ''
	}

	public getTemporaryToken() {
		return localStorage.getItem(TEMPORARY_TOKEN) ?? '';
	}

	public removeTemporaryToken() {
		localStorage.removeItem(TEMPORARY_TOKEN);
	}
}
