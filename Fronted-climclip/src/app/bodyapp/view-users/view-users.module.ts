import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUsersPageRoutingModule } from './view-users-routing.module';

import { ViewUsersPage } from './view-users.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUsersPageRoutingModule, ComponentesModule
  ],
  declarations: [ViewUsersPage]
})
export class ViewUsersPageModule {}
