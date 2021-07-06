import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: UserCreateEditComponent },
    { path: 'edit/:id', component: UserCreateEditComponent },
	{ path: 'view', component: UserListComponent },
	{ path: 'reset-password/:id', component: UserResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
