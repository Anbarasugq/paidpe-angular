import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-kyc-create-edit',
  templateUrl: './kyc-create-edit.component.html',
  styleUrls: ['./kyc-create-edit.component.scss'],
})
export class KycCreateEditComponent implements OnInit {
  validateForm!: FormGroup;
  employeeid: any;
  mobileno: any;
  userId: any;
  reportingTo: any;
  title = 'Create';
  btnName = 'Submit';
  isSubmit = false;
  salesPerson: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private successService: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenservice.getuserid();
    let roleParam = { action: 'getSalesUsersList' };
    this.apiservice.allService(roleParam).subscribe((data: any) => {
      this.salesPerson = data?.data;
    });

    let reportParam = { action: 'getUsersList' };
    this.apiservice.allService(reportParam).subscribe((data: any) => {
      this.reportingTo = data?.data;
    });

    this.employeeid = this.activatedRoute.snapshot.paramMap.get('id');

    this.mobileno = this.activatedRoute.snapshot.paramMap.get('mobileno');

    this.validateForm = this.fb.group({
      client_name: [null, [Validators.required]],
      mobile_number: [null, [Validators.required]],
      dob: [null],
      email: [null],
      alt_mobile: [null],
      annual_income: [null],
      wedding_day: [null],
      pan_no: [null],
      aadhar_no: [null],
      assigned_to: [null, [Validators.required]],
      sales_person: [null],
      status: [true],
      isLive:[true]
    });

    if (this.employeeid) {
      this.title = 'Edit';
      this.btnName = 'Update';
      let param = {
        action: 'getClientKYCByMobile',
        mobile_number: this.mobileno,
      };
      this.apiservice.allService(param).subscribe((data) => {
        let editData = data?.data;
        if (data) {
          this.validateForm.patchValue({
            client_name: editData[0]?.client_name,
            mobile_number: editData[0]?.mobile_number,
            email: editData[0]?.email,
            dob: editData[0]?.dob,
            alt_mobile: editData[0]?.alt_mobile,
            annual_income: editData[0]?.annual_income,
            wedding_day: editData[0]?.wedding_day,
            pan_no: editData[0]?.pan_no,
            aadhar_no: editData[0]?.aadhar_no,
            assigned_to: editData[0]?.assigned_to,
            sales_person: editData[0]?.sales_person,
            isLive: editData[0]?.isLive,
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
    if (this.validateForm.valid) {
      this.isSubmit = true;
      if (this.employeeid) {
        let editParam = {
          ...form.value,
          action: 'updateClientKYCById',
          userId: this.userId,
          kycId: this.employeeid,
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage('success', data.message);
            this.router.navigate(['/client/kyc-list']);
          } else {
            this.isSubmit = false;
            this.successService.ResponseMessage('error', data.message);
          }
        });
      } else {
        let createParam = {
          ...form.value,
          action: 'createClientKYC',
          userId: this.userId,
        };
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage('success', data.message);
            this.router.navigate(['/client/kyc-list']);
          } else {
            this.isSubmit = false;
            this.successService.ResponseMessage('error', data.message);
          }
        });
      }
    }
    else{
      this.isSubmit = false;
    }
  }
  
  onBack(): void {
    this.router.navigate(['/client/kyc-list']);
  }
}
