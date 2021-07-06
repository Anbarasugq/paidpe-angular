import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USER_NAME_KEY = 'vGQkALqwd6LCKqV3UwEB9DtTwQ8P882x';
const USER_ID_KEY = 'wR9tGPMdUf2u7VaQtgYYpVeFVd3Ka48q';
const USER_TYPE_KEY = 'TeygTpQCQ2V2Qh9hz998hKD7yYBSPt5W';

const accesstokenkeys = ['USER_NAME_KEY', 'USER_ID_KEY', 'USER_TYPE_KEY'];

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor(private router: Router) {}

    cleartokens = (): void => {
		accesstokenkeys.forEach((element) => {
			window.sessionStorage.removeItem(element);
		});
	};

    savetoken = (userName: string, userId:any, userType:any): void => {
        this.cleartokens();
		window.sessionStorage.setItem(USER_NAME_KEY, userName);
		window.sessionStorage.setItem(USER_ID_KEY, userId);
		window.sessionStorage.setItem(USER_TYPE_KEY, userType);
	};

	gettoken = (): string => {
		const userName = sessionStorage.getItem(USER_NAME_KEY);
		const userId = sessionStorage.getItem(USER_ID_KEY);
		const userType = sessionStorage.getItem(USER_TYPE_KEY);
		if (userName && userId && userType ) {
			return `${userName}.${userId}.${userType}`;
		}
		return '';
	};

	logout(): void {
		sessionStorage.clear();
        this.cleartokens();
		this.router.navigateByUrl('/auth/login');
	}

    getuser = (): any => sessionStorage.getItem(USER_NAME_KEY);
    getuserid = (): any => sessionStorage.getItem(USER_ID_KEY);
    getusertype = (): any => sessionStorage.getItem(USER_TYPE_KEY);
}
