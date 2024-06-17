import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaUsersPageRoutingModule } from './lista-users-routing.module';

import { ListaUsersPage } from './lista-users.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaUsersPageRoutingModule,
    ComponentesModule
  ],
  declarations: [ListaUsersPage]
})
export class ListaUsersPageModule {}
