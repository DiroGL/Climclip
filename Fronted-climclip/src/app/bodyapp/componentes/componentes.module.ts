import { FiltrosComponent } from './filtros/filtros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { BloqueComponent } from './bloque/bloque.component';
import { CrearActualizarPublicacionesComponent } from './crear-actualizar-publicaciones/crear-actualizar-publicaciones.component';
import { ItemBusquedaComponent } from './item-busqueda/item-busqueda.component';
import { ViewBlockComponent } from './view-block/view-block.component';




@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent, 
    FiltrosComponent,
    BloqueComponent,
    CrearActualizarPublicacionesComponent,ItemBusquedaComponent,
    ViewBlockComponent
  ],
  imports: [
    CommonModule,
    IonicModule, FormsModule,ReactiveFormsModule
  ], exports :[
    FooterComponent, HeaderComponent, BloqueComponent,CrearActualizarPublicacionesComponent ,ItemBusquedaComponent,ViewBlockComponent
  ]
})
export class ComponentesModule { }
