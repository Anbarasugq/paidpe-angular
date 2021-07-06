import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES
  ],
  declarations: [ChangePasswordComponent]
})
export class SettingsModule { }
