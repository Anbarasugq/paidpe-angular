import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsRoutingModule } from './client-details-routing.module';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycCreateEditComponent } from './kyc-create-edit/kyc-create-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
import { ServiceCreateEditComponent } from './service-create-edit/service-create-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { InvestmentLiListComponent } from './investment-li-list/investment-li-list.component';
import { InvestmentOthersListComponent } from './investment-others-list/investment-others-list.component';
import { InvestmentHealthListComponent } from './investment-health-list/investment-health-list.component';
import { InvestmentHealthCreateEditComponent } from './investment-health-create-edit/investment-health-create-edit.component';
import { InvestmentOthersCreateEditComponent } from './investment-others-create-edit/investment-others-create-edit.component';
import { InvestmentLiCreateEditComponent } from './investment-li-create-edit/investment-li-create-edit.component';
import { RelationsCreateEditComponent } from './relations-create-edit/relations-create-edit.component';
import { RelationsListComponent } from './relations-list/relations-list.component';

@NgModule({
  imports: [
    CommonModule,
    ClientDetailsRoutingModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
  ],
  declarations: [
    KycListComponent,
    KycCreateEditComponent,
    ServiceListComponent,
    ServiceCreateEditComponent,
    InvestmentLiListComponent,
    InvestmentLiCreateEditComponent,
    InvestmentHealthListComponent,
    InvestmentHealthCreateEditComponent,
    InvestmentOthersListComponent,
    InvestmentOthersCreateEditComponent,
    RelationsCreateEditComponent,
    RelationsListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientDetailsModule {}
