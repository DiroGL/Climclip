import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasDePrivacidadPageRoutingModule } from './politicas-de-privacidad-routing.module';

import { PoliticasDePrivacidadPage } from './politicas-de-privacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasDePrivacidadPageRoutingModule
  ],
  declarations: [PoliticasDePrivacidadPage]
})
export class PoliticasDePrivacidadPageModule {}
