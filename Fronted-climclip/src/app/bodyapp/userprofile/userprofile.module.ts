import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserprofilePageRoutingModule } from './userprofile-routing.module';

import { UserprofilePage } from './userprofile.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserprofilePageRoutingModule,
    ComponentesModule
  ],
  declarations: [UserprofilePage]
})
export class UserprofilePageModule {}
