import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
// import { AuthService } from 'src/app/services/auth.service';

@NgModule({
	imports: [
		CommonModule,
		AuthLayoutRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		...SHARED_ZORRO_MODULES
	],
	declarations: [LoginComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// providers: [AuthService],
	providers: [],
})
export class AuthLayoutModule {}
