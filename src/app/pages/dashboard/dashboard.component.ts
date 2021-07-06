import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  validateForm!: FormGroup;
  listOfData: any = [];
  serviceListOfData: any;
  insuranceListOfData: any;
  healthListOfData: any;
  otherListOfData: any;
  relationListOfData:any;
  loading = false;
  userId: any;
  userType: any;
  clientid: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private successService: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mobile_number: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      let param = {
        ...this.validateForm.value,
        action: 'getClientKYCByMobile',
      };
      this.loading = true;
      this.apiservice.allService(param).subscribe((data) => {
        if (data.status) {
          this.listOfData = data?.data;
          this.id = this.listOfData[0].id;
          setInterval(() => {
            this.loading = false;
          }, 800);
        } else {
          this.loading = false;
          this.successService.ResponseMessage('error', data.message);
        }
      });
    }
  }
  clientDetails(data: any){
    this.serviceData(data);
    this.lifeInsuranceData(data);
    this.healthData(data);
    this.otherData(data);
    this.relationData(data);
  }
  serviceData(data: any): void {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.loading = true;
    let paramService = {
      action: 'getServiceListByUser',
      userId: this.userId,
      clientId: data,
      userType: this.userType,
    };
    this.apiservice.allService(paramService).subscribe((data: any) => {
      this.serviceListOfData = data?.data;
      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }
  lifeInsuranceData(data: any): void {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.loading = true;
    let param = {
      action: 'getClientsLIInvestmentsByUser',
      userId: this.userId,
      clientId: data,
      userType: this.userType,
    };
    this.apiservice.allService(param).subscribe((data: any) => {
      this.insuranceListOfData = data?.data;
      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }

  healthData(data: any): void {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.loading = true;
    let param = {
      action: 'getClientsHealthInvestmentsByUser',
      userId: this.userId,
      clientId: data,
      userType: this.userType,
    };
    this.apiservice.allService(param).subscribe((data: any) => {
      this.healthListOfData = data?.data;
      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }

  otherData(data: any): void {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();

    let param = {
      action: 'getClientsOtherInvestmentsByUser',
      userId: this.userId,
      clientId: data,
      userType: this.userType,
    };
    this.loading = true;
    this.apiservice.allService(param).subscribe((data: any) => {
      this.otherListOfData = data?.data;
      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }
  relationData(data: any): void {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();

    let param = {
      action: 'getRelationshipsByClientId',
      clientId: data,
    };
    this.loading = true;
    this.apiservice.allService(param).subscribe((data: any) => {
      this.relationListOfData = data?.data;
      setInterval(() => {  this.loading = false; }, 800);      
    });
  }
}
