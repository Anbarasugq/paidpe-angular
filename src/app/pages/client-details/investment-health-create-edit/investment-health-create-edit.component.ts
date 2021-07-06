import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-investment-health-create-edit',
  templateUrl: './investment-health-create-edit.component.html',
  styleUrls: ['./investment-health-create-edit.component.scss'],
})
export class InvestmentHealthCreateEditComponent implements OnInit {
  validateForm!: FormGroup;
  clientid: any;
  title = 'Create';
  btnName = 'Submit';
  providerList: Array<any> = [];
  userid: any;
  id: any;
  createUrl: any;
  investmentid: any;
  providerid: any;
  isSubmit = false;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private successService: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.userid = this.tokenservice.getuserid();
    
    let providerParam = { action: 'getLIProvidersList' };
    this.apiservice.allService(providerParam).subscribe((data: any) => {
      this.providerList = data?.data;
    });
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.providerid = this.activatedRoute.snapshot.paramMap.get('providerid');
    this.clientid = this.activatedRoute.snapshot.paramMap.get('clientid');
    console.log('client id', this.investmentid)

    this.createUrl = this.router.url.split('?')[0];

    this.validateForm = this.fb.group({
      provider_id: [null, [Validators.required]],
      policy_details: [null],
      issue_date: [null],
      policy_status: [null],
      premium: [null],
      relationship: [null],
      sum_assured: [null],
      mode_of_pay: [null],
      due_date: [null],
      paying_term: [null],
      renewal_date: [null],
      status: [true],
    });

    if (
      this.clientid &&
      this.createUrl !== `/client/investment-health-create/${this.id}`
    ) {
      this.title = 'Edit';
      this.btnName = 'Update';
      let param = {
        action: 'getHealthInvestmentsByClientandPro',
        provider_id:this.providerid,
        client_id:this.clientid
      };
      this.apiservice.allService(param).subscribe((data) => {
        let editData = data?.data;
        if (editData) {
          this.validateForm.patchValue({
            provider_id: editData[0]?.provider_id,
            policy_details: editData[0]?.policy_details,
            issue_date: editData[0]?.issue_date,
            policy_status: editData[0]?.policy_status,
            premium: editData[0]?.premium,
            relationship: editData[0]?.relationship,
            sum_assured: editData[0]?.sum_assured,
            mode_of_pay: editData[0]?.mode_of_pay,
            due_date: editData[0]?.due_date,
            paying_term: editData[0]?.paying_term,
            renewal_date: editData[0]?.renewal_date,
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
      if (
        this.clientid &&
        this.createUrl !== `/client/investment-health-create/${this.id}`
      ) {
        let editParam = {
          ...form.value,
          action: 'updateHealthInvestmentsById',
          client_id: this.clientid,
          userId: this.userid,
          investmentId:this.id
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage('success', data.message);
            this.router.navigate([
              `/client/investment-health-list/${this.clientid}`,
            ]);
          } else {
            this.isSubmit = false;
            this.successService.ResponseMessage('error', data.message);
          }
        });
      } else {
        let createParam = {
          ...form.value,
          action: 'createHealthInvestments',
          client_id: this.id,
          userId: this.userid,
        };
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.successService.ResponseMessage('success', data.message);
            this.router.navigate([
              `/client/investment-health-list/${this.id}`,
            ]);
          } else {
            this.successService.ResponseMessage('error', data.message);
          }
        });
      }
    }else{
      this.isSubmit = false;
    }
  }
}
