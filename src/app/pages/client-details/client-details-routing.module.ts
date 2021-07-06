import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentHealthCreateEditComponent } from './investment-health-create-edit/investment-health-create-edit.component';
import { InvestmentHealthListComponent } from './investment-health-list/investment-health-list.component';
import { InvestmentLiCreateEditComponent } from './investment-li-create-edit/investment-li-create-edit.component';
import { InvestmentLiListComponent } from './investment-li-list/investment-li-list.component';
import { InvestmentOthersCreateEditComponent } from './investment-others-create-edit/investment-others-create-edit.component';
import { InvestmentOthersListComponent } from './investment-others-list/investment-others-list.component';
import { KycCreateEditComponent } from './kyc-create-edit/kyc-create-edit.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { RelationsCreateEditComponent } from './relations-create-edit/relations-create-edit.component';
import { RelationsListComponent } from './relations-list/relations-list.component';
import { ServiceCreateEditComponent } from './service-create-edit/service-create-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  { path: 'kyc-list', component: KycListComponent },
  { path: 'kyc-create', component: KycCreateEditComponent },
  { path: 'kyc-edit/:id/:mobileno', component: KycCreateEditComponent },
  { path: 'service-list/:id', component: ServiceListComponent },
  { path: 'service-create/:id', component: ServiceCreateEditComponent },
  { path: 'service-edit/:id', component: ServiceCreateEditComponent },
  { path: 'investment-li-list/:id', component: InvestmentLiListComponent },
  { path: 'investment-li-create/:id', component: InvestmentLiCreateEditComponent },
  { path: 'investment-li-edit/:id/:clientid/:providerid', component: InvestmentLiCreateEditComponent },
  { path: 'investment-health-list/:id', component: InvestmentHealthListComponent },
  { path: 'investment-health-create/:id', component: InvestmentHealthCreateEditComponent },
  { path: 'investment-health-edit/:id/:clientid/:providerid', component: InvestmentHealthCreateEditComponent },
  { path: 'investment-others-list/:id', component: InvestmentOthersListComponent },
  { path: 'investment-others-create/:id', component: InvestmentOthersCreateEditComponent },
  { path: 'investment-others-edit/:id/:clientid', component: InvestmentOthersCreateEditComponent },
  { path: 'relations-list/:id', component: RelationsListComponent },
  { path: 'relations-create/:id', component: RelationsCreateEditComponent },
  { path: 'relations-edit/:id/:clientid', component: RelationsCreateEditComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDetailsRoutingModule { }
