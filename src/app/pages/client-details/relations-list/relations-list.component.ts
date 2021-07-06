import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-relations-list',
  templateUrl: './relations-list.component.html',
  styleUrls: ['./relations-list.component.scss']
})
export class RelationsListComponent implements OnInit {

  listOfData: any = [];
  clientid:any;
  loading = false;
  constructor(
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private tokenservice: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientid = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = true 
    let param = {
      action: 'getRelationshipsByClientId',
      clientId: this.clientid,
    };
    this.apiservice.allService(param).subscribe((data: any) => {
      this.listOfData = data?.data;
      setInterval(() => {  this.loading = false; }, 800);      
    });
  }

  
  onBack(): void {
    this.router.navigate(['/client/kyc-list']);
  }

}
