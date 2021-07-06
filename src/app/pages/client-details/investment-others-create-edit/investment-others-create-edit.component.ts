import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-investment-others-create-edit',
  templateUrl: './investment-others-create-edit.component.html',
  styleUrls: ['./investment-others-create-edit.component.scss'],
})
export class InvestmentOthersCreateEditComponent implements OnInit {
  validateForm!: FormGroup;
  clientId: any;
  userId: any;
  btnName = 'Submit';
  title = 'Create';
  createUrl: any;
  id:any;
  userRole: Array<any> = [];
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
    this.userId = this.tokenservice.getuserid();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientId = this.activatedRoute.snapshot.paramMap.get('clientid');
    this.validateForm = this.fb.group({
      mutual_fund: [null],
      gold: [null],
      consultation: [null],
      pms: [null],
      equity: [null],
      status: [true]
    });
    this.createUrl = this.router.url.split('?')[0];
    if (
      this.clientId &&
      this.createUrl !== `/client/investment-others-create/${this.clientId}`
    ) {
      this.btnName = 'Update';
      this.title = 'Edit';
      let param = {
        action: 'getOtherInvestmentsByClient',
        client_id: this.clientId,
      };
      this.apiservice.allService(param).subscribe((data) => {
        let editData = data?.data;
        if (editData) {
          this.validateForm.patchValue({
            mutual_fund: editData[0]?.mutual_fund,
            gold: editData[0]?.gold,
            consultation: editData[0]?.consultation,
            pms: editData[0]?.pms,
            equity: editData[0]?.equity,
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
        this.clientId &&
        this.createUrl !== `/client/investment-others-create/${this.clientId}`
      ) {
        let editParam = {
          ...form.value,
          action: 'updateOtherInvestmentsByClient',
          userId: this.clientId,
          investmentId: this.id
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.successService.ResponseMessage('success', data.message);
            this.isSubmit = false;
            this.router.navigate([
              `/client/investment-others-list/${this.id}`,
            ]);
          } else {
            this.isSubmit = false;
            this.successService.ResponseMessage('error', data.message);
          }
        });
      } else {
        let editParam = {
          ...form.value,
          action: 'createOtherInvestments',
          client_id: this.id,
          userId: this.userId,
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage('success', data.message);
            this.router.navigate([
              `/client/investment-others-list/${this.id}`,
            ]);
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
}
