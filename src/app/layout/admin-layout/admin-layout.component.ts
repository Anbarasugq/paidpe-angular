import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';
// import { TokenService } from 'src/app/services/token.service';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
	
	isCollapsed = false;
	Menus: Array<any> = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: 'dashboard',
		},
		{
			text: 'User',
			url: '/user/view',
			icon: 'user-add',
		},
		{
			text: 'Client KYC',
			url: '/client/kyc-list',
			icon: 'dollar',
		},
		// {
		// 	text: 'Investment Life Insurance',
		// 	url: '/client/investment-li-list',
		// 	icon: 'calculator',
		// },
		// {
		// 	text: 'Investment Health',
		// 	url: '/client/investment-health-list',
		// 	icon: 'calculator',
		// },
		// {
		// 	text: 'Investment Other',
		// 	url: '/client/investment-others-list',
		// 	icon: 'calculator',
		// },
		// {
		// 	text: 'Service',
		// 	url: '/client/service-list',
		// 	icon: 'file-excel',
		// },
	];
	loginUser:any;
	constructor(
		private router: Router,
		private tokenservice: TokenService
	  ) { }

	ngOnInit(): void {
		this.loginUser = this.tokenservice.getuser()
	}

	logout(): void {
		this.tokenservice.logout();
		this.router.navigate(['/auth/login']);
	}
}
