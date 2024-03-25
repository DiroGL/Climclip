import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeLoginPageRoutingModule } from './home-login-routing.module';

import { HomeLoginPage } from './home-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLoginPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [HomeLoginPage]
})
export class HomeLoginPageModule {}
