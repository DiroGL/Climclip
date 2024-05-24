import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasDeUsoPage } from './politicas-de-uso.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasDeUsoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticasDeUsoPageRoutingModule {}
