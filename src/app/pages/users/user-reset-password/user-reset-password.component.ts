import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent implements OnInit {

  validateForm!: FormGroup;
  userId: any;
  resetuserId:any;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private router: Router,
    private successservice: SuccessService,
    private tokenservice: TokenService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.resetuserId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = this.tokenservice.getusertype();
    this.validateForm = this.fb.group({
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  submitForm(form: FormGroup): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (form.valid) {
        let createParam = {
          action:'requestResetPassword',
          newPassword: form?.value?.newPassword,
          confirmPassword: form?.value?.confirmPassword,
          userRole:this.userId,
          resetuserId:this.resetuserId
        };
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.successservice.ResponseMessage('success', data.message);
            this.router.navigate(['/user/view']);
          } else {
            this.successservice.ResponseMessage(
              'error',
              data.message
            );
          }
        });
    }
  }
  onBack(): void {
    this.router.navigate(['/user/view']);
  }
}
