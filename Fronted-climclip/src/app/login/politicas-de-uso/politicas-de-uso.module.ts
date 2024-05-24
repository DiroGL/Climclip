import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasDeUsoPageRoutingModule } from './politicas-de-uso-routing.module';

import { PoliticasDeUsoPage } from './politicas-de-uso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasDeUsoPageRoutingModule
  ],
  declarations: [PoliticasDeUsoPage]
})
export class PoliticasDeUsoPageModule {}
