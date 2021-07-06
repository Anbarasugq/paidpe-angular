import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES
  ],
  declarations: [UserListComponent, UserCreateEditComponent, UserResetPasswordComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsersModule { }
