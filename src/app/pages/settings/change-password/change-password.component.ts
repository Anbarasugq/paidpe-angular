import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  validateForm!: FormGroup;
  userId: any;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private router: Router,
    private successservice: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenservice.getuserid();
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
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
          action:'requestChangePassword',
          oldPassword: form?.value?.oldPassword,
          newPassword: form?.value?.newPassword,
          confirmPassword: form?.value?.confirmPassword,
          userId:this.userId,
        };
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.successservice.ResponseMessage('success', data.message);
            this.router.navigate(['/dashboard']);
          } else {
            this.successservice.ResponseMessage(
              'error',
              data.message
            );
          }
        });
    }
  }

}
