import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLoginPage } from './home-login.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLoginPageRoutingModule {}
