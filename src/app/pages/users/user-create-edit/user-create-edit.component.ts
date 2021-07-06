import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss'],
})
export class UserCreateEditComponent implements OnInit {
  validateForm!: FormGroup;
  employeeid: any;
  title = 'Create';
  btnName = 'Submit';
  userRole: Array<any> = [];
  reportingTo: Array<any> = [];
  userId: any;
  isSubmit = false;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private successservice: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenservice.getuserid();
    let roleParam = { action: 'getUserRoles' };
    this.apiservice.allService(roleParam).subscribe((data: any) => {
      this.userRole = data?.data;
    });

    let reportParam = { action: 'getUsersList' };
    this.apiservice.allService(reportParam).subscribe((data: any) => {
      this.reportingTo = data?.data;
    });

    this.employeeid = this.activatedRoute.snapshot.paramMap.get('id');
    this.validateForm = this.fb.group({
      employee_name: [null, [Validators.required]],
      employee_code: [null, [Validators.required]],
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      mobile: [null],
      reporting_to: [[]],
      user_role: [[], [Validators.required]],
      status: [true],
    });
    if (this.employeeid) {
      this.title = 'Edit';
      this.btnName = 'Update';
      let param = { action: 'getUsersListById', userId: this.employeeid };
      this.apiservice.allService(param).subscribe((data) => {
        let editData = data?.data;
        if (editData) {
          this.validateForm.patchValue({
            employee_name: editData[0]?.employee_name,
            employee_code: editData[0]?.employee_code,
            user_name: editData[0]?.user_name,
            password: editData[0]?.password,
            mobile: editData[0]?.mobile,
            reporting_to: editData[0]?.reporting_to,
            user_role: editData[0]?.user_role,
            status: editData[0]?.status,
          });
        }
      });
    }
  }

  submitForm(form: FormGroup): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (form.valid) {
      this.isSubmit = true;
      if (this.employeeid) {
        let editParam = {
          employee_name: form?.value?.employee_name,
          employee_code: form?.value?.employee_code,
          user_name: form?.value?.user_name,
          password: form?.value?.password,
          mobile: form?.value?.mobile,
          reporting_to: form?.value?.reporting_to,
          user_role: form?.value?.user_role,
          status: form?.value?.status ? 'act' : 'del',
          action: 'updateUserById',
          userId: this.userId,
          employeeId: this.employeeid,
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successservice.ResponseMessage('success', data.message);
            this.router.navigate(['/user/view']);
          } else {
            this.isSubmit = false;
            this.successservice.ResponseMessage(
              'error',
              data.message
            );
          }
        });
      } else {
        let createParam = {
          employee_name: form?.value?.employee_name,
          employee_code: form?.value?.employee_code,
          user_name: form?.value?.user_name,
          password: form?.value?.password,
          mobile: form?.value?.mobile,
          reporting_to: form?.value?.reporting_to,
          user_role: form?.value?.user_role,
          status: form?.value?.status ? 'act' : 'del',
          action: 'createUsers',
          userId: this.userId,
        };

        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successservice.ResponseMessage('success', data.message);
            this.router.navigate(['/user/view']);
          } else {
            this.isSubmit = false;
            this.successservice.ResponseMessage(
              'error',
              data.message
            );
          }
        });
      }
    }else{
      this.isSubmit = false;
    }
  }

  onBack(): void {
    this.router.navigate(['/user/view']);
  }
}
