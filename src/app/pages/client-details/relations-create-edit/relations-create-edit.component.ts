import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-relations-create-edit',
  templateUrl: './relations-create-edit.component.html',
  styleUrls: ['./relations-create-edit.component.scss']
})
export class RelationsCreateEditComponent implements OnInit {

  validateForm!: FormGroup;
  investmentid: any;
  title = 'Create';
  btnName = 'Submit';
  providerList: Array<any> = [];
  userid: any;
  createUrl: any;
  providerid:any;
  clientid:any;
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

    let roleParam = { action: 'getLIProvidersList' };
    this.apiservice.allService(roleParam).subscribe((data: any) => {
      this.providerList = data?.data;
    });
    this.investmentid = this.activatedRoute.snapshot.paramMap.get('id');
    this.providerid = this.activatedRoute.snapshot.paramMap.get('providerid');
    this.clientid = this.activatedRoute.snapshot.paramMap.get('clientid');
    this.createUrl = this.router.url.split('?')[0] ;
    this.validateForm = this.fb.group({
      member_name: [null, [Validators.required]],
      member_dob: [null],
      relationship: [null],
      status: [true],
    });

    if (this.investmentid && this.createUrl !== `/client/relations-create/${this.investmentid}`) {
      this.title = 'Edit';
      this.btnName = 'Update';
      let param = {
        action: 'getRelationshipByRelationId',
        relationId:this.providerid,
        client_id:this.clientid
      };
      this.apiservice.allService(param).subscribe((data) => {
        let editData = data?.data;
        if (editData) {
          this.validateForm.patchValue({
            member_name: editData[0]?.member_name,
            member_dob: editData[0]?.member_dob,
            relationship: editData[0]?.relationship,
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
      if (this.investmentid && this.createUrl !== `/client/relations-create/${this.investmentid}`) {
        let editParam = {
          ...form.value,
          action: 'updateRelationshipByRelationId',
          client_id: this.clientid,
          userId: this.userid,
          investmentId:this.investmentid
        };
        this.apiservice.allService(editParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage(
              'success',
              data.message
            );
            this.router.navigate([
              `/client/relations-list/${this.clientid}`,
            ]);
          }else{
            this.isSubmit = false;
            this.successService.ResponseMessage(
              'error',
              data.message
            );
          }
        });
      } else {
        let createParam = {
          ...form.value,
          action: 'createClientRelations',
          userId: this.userid,
          client_id: this.investmentid,
        };
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.successService.ResponseMessage(
              'success',
              data.message
            );
            this.router.navigate([
              `/client/relations-list/${this.investmentid}`,
            ]);
          } else {
            this.isSubmit = false;
            this.successService.ResponseMessage(
              'error',
              data.message
            );
          }
        });
      }
    }
    else{
      this.isSubmit = false;
    }
  }
  
  onBack(): void {
    this.router.navigate([`/client/relations-list/${this.investmentid}`]);
  }
}
