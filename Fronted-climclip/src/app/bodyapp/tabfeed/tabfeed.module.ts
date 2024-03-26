import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabfeedPageRoutingModule } from './tabfeed-routing.module';

import { TabfeedPage } from './tabfeed.page';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabfeedPageRoutingModule, ComponentesModule
  ],
  declarations: [TabfeedPage]
})
export class TabfeedPageModule {}
