import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasDePrivacidadPage } from './politicas-de-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasDePrivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticasDePrivacidadPageRoutingModule {}
