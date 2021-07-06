import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  listOfData: any = [];
  loading =false;
  userId:any;
  constructor(
    private apiservice: ApiService,
    private modal: NzModalService,
    private successService: SuccessService,
    private tokenservice: TokenService
  ) {}

  ngOnInit() {
    this.userId = this.tokenservice.getuserid();
    let param = {action :'getUsersList'}
    this.loading = true 
    this.apiservice.allService(param).subscribe((data: any) => {
       this.listOfData = data?.data;
       setInterval(() => {  this.loading = false; }, 800);
    });
  }

}
