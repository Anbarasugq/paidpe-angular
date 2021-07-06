import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-investment-li-list',
  templateUrl: './investment-li-list.component.html',
  styleUrls: ['./investment-li-list.component.scss']
})
export class InvestmentLiListComponent implements OnInit {
  listOfData: any = [];
  clientid:any;
  userType:any;
  userId:any;
  loading = false;
  constructor(
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private tokenservice: TokenService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userId = this.tokenservice.getuserid();
    this.userType = this.tokenservice.getusertype();
    this.clientid = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = true;
    let param = {action :'getClientsLIInvestmentsByUser', userId:this.userId, clientId:this.clientid, userType:this.userType}
    this.apiservice.allService(param).subscribe((data: any) => {
      this.listOfData = data?.data;
      setInterval(() => {  this.loading = false; }, 800);
    });
  }

  onBack(): void {
    this.router.navigate(['/client/kyc-list']);
  }

}
