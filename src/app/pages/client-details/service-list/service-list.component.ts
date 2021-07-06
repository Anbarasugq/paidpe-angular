import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  validateForm!: FormGroup;
  listOfData: any = [];
  clientid: any;
  userType: any;
  userId: any;
  loading = false;
  isVisible = false;
  id: any;
  constructor(
    private apiservice: ApiService,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      comment: [null],
    });

    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.clientid = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = true;
    let param = {
      action: 'getServiceListByUser',
      userId: this.userId,
      clientId: this.clientid,
      userType: this.userType,
    };
    this.apiservice.allService(param).subscribe((data: any) => {
      this.listOfData = data?.data;
      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }

  showModal(id: any): void {
    this.id = id;
    this.isVisible = true;
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const close_description = this.validateForm.value?.comment
    let param = {close_description: close_description, action :'closeService', serviceId:this.id}
        this.apiservice.allService(param).subscribe((data: any) => {
          if(data.status){
            this.listOfData = data?.data;
            this.ngOnInit();
          }else{
            this.successService.ResponseMessage('error', data.message);
          }
        });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onBack(): void {
    this.router.navigate(['/client/kyc-list']);
  }

  
}
