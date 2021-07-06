import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	validateForm!: FormGroup;
	isSubmit = false;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private successService : SuccessService,
		private apiservice: ApiService,
		private jwtHelper: JwtHelperService,
	) {}

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			useremail: ["aruljothy.s8@gmail.com", [Validators.required]],
			password: ["Arul82#u08", [Validators.required]],
		});
	}

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(i)) {
				this.validateForm.controls[i].markAsDirty();
				this.validateForm.controls[i].updateValueAndValidity();
			}
		}
		if(this.validateForm.value.useremail && this.validateForm.value.password){
			this.isSubmit = true;

			let loginParam = {...this.validateForm.value}
       			 this.apiservice.login(loginParam).subscribe(data => {
						console.log("ddd", data);

						if (data.data.accessToken !== '') {
							const token_decode = this.jwtHelper.decodeToken(data?.data?.accessToken);
							console.log("decode", token_decode);
							const username="";
							this.apiservice.setlogin(data?.data?.accessToken, data?.data?.refreshToken, username);

							// this.subscription = this.jwtHelper.decodeToken(
							//   this.tokenService.gettoken()
							//   );
							//   await this.authService.saveuserinfo(this.jwtHelper.decodeToken(
							// 	this.tokenService.gettoken()
							// 	))
							// 	this.authService.isLoggedIn = true;
							// 	this.successService.ResponseMessage('success', 'Login Successfully');
							// 	this.loader.hideLoader();
							this.router.navigate(['/dashboard']);
						  }else{
						this.isSubmit = false;
						this.successService.ResponseMessage("error", data.message)
					}
				})
		}
		else{
			this.isSubmit = false
			this.successService.ResponseMessage("error","Enter valid username and password")
		}
		
	}
}
