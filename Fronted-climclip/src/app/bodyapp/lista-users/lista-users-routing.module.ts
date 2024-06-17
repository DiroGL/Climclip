import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaUsersPage } from './lista-users.page';

const routes: Routes = [
  {
    path: '',
    component: ListaUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaUsersPageRoutingModule {}
