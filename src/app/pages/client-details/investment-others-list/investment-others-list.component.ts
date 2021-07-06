import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/service/api.service';
import { SuccessService } from 'src/app/service/success.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-investment-others-list',
  templateUrl: './investment-others-list.component.html',
  styleUrls: ['./investment-others-list.component.scss'],
})
export class InvestmentOthersListComponent implements OnInit {
  listOfData: any = [];
  loading = false;
  userId: any;
  userType: any;
  clientid: any;
  addBtnHide = true;
  constructor(
    private apiservice: ApiService,
    private modal: NzModalService,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.clientid = this.activatedRoute.snapshot.paramMap.get('id');

    let param = {
      action: 'getClientsOtherInvestmentsByUser',
      userId: this.userId,
      clientId: this.clientid,
      userType: this.userType,
    };
    this.loading = true;
    this.apiservice.allService(param).subscribe((data: any) => {
      this.listOfData = data?.data;
      if (data?.status) {
        this.addBtnHide = false;
      }
      console.log('Health data', data?.status);

      setInterval(() => {
        this.loading = false;
      }, 800);
    });
  }

  onBack(): void {
    this.router.navigate(['/client/kyc-list']);
  }
}
