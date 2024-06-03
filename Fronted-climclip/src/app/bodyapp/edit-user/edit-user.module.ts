import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserPageRoutingModule } from './edit-user-routing.module';

import { EditUserPage } from './edit-user.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserPageRoutingModule, ReactiveFormsModule, ComponentesModule
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
