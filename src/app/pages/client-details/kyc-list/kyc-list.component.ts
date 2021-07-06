import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.scss']
})
export class KycListComponent implements OnInit {

  listOfData: any = [];
  userType:any;
  userId:any;
  loading =false;

  constructor(
    private apiservice: ApiService,
    private modal: NzModalService,
    private successService: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit() {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.loading = true 
    let param = {action :'getClientsKycByUser', userType: this.userType, userId:this.userId}
    this.apiservice.allService(param).subscribe((data: any) => {
      this.listOfData = data?.data;
      setInterval(() => {  this.loading = false; }, 800);      
    });
  }
}
