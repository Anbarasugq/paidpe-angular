import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-service-create-edit',
  templateUrl: './service-create-edit.component.html',
  styleUrls: ['./service-create-edit.component.scss'],
})
export class ServiceCreateEditComponent implements OnInit {
  validateForm!: FormGroup;
  clientid: any;
  title = 'Create';
  btnName = 'Submit';
  userid: any;
  show: any;
  isSubmit = false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private router: Router,
    private successservice: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(): void {
    this.userid = this.tokenservice.getuserid();
    this.clientid = this.activatedRoute.snapshot.paramMap.get('id');
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      designation: [null],
      mobile_no: [null],
      place: [null],
      service_time: [null],
      open_description: [null]
    });

    // if (
    //   this.clientid 
    // ) {
    //   let param = {
    //     action: 'getServiceByClientServiceId',
    //     serviceId: this.clientid,
    //   };
    //   this.apiservice.allService(param).subscribe((data) => {
    //     let editData = data?.data;
    //     if (editData) {
    //       this.validateForm.patchValue({
    //         name: editData[0]?.name,
    //         designation: editData[0]?.designation,
    //         mobile_no: editData[0]?.mobile_no,
    //         place: editData[0]?.place,
    //         service_time: editData[0]?.service_time,
    //         open_description: editData[0]?.open_description,
    //         close_description: editData[0]?.close_description,
    //       });
    //     }
    //   });
    // }
  }
  submitForm(form: FormGroup): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(form.valid){
      this.isSubmit = true;
        let createParam = {
          ...form.value,
          action: 'createService',
          userId: this.userid,
          client_id: this.clientid,
        };        
        this.apiservice.allService(createParam).subscribe((data) => {
          if (data.status) {
            this.isSubmit = false;
            this.router.navigate([`/client/service-list/${this.clientid}`]);
            this.successservice.ResponseMessage('success', data.message);
          } else {
            this.isSubmit = false;
            this.successservice.ResponseMessage('error', data.message);
          }
        });
    }
    else{
      this.isSubmit = false;
    }
  }
}
