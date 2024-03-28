import { FiltrosComponent } from './filtros/filtros.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { BloqueComponent } from './bloque/bloque.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent, 
    FiltrosComponent,
    BloqueComponent
  ],
  imports: [
    CommonModule,
    IonicModule, FormsModule
  ], exports :[
    FooterComponent, HeaderComponent, BloqueComponent
  ]
})
export class ComponentesModule { }
