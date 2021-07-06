import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminLayoutComponent } from './admin-layout.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
	imports: [
		CommonModule,
		AdminLayoutRoutingModule,
		FormsModule,
		IconsProviderModule,
		NzLayoutModule,
		...SHARED_ZORRO_MODULES
	],
	declarations: [AdminLayoutComponent],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
