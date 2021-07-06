import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'user', loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule) },
  { path: 'client', loadChildren: () => import('../../pages/client-details/client-details.module').then(m => m.ClientDetailsModule) },
  { path: 'settings', loadChildren: () => import('../../pages/settings/settings.module').then(m => m.SettingsModule) },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
