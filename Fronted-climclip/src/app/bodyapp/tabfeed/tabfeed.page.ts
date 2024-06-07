import { Block } from 'src/app/login/models/block.models';
import { Component } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { CrearActualizarPublicacionesComponent } from '../componentes/crear-actualizar-publicaciones/crear-actualizar-publicaciones.component';


@Component({
  selector: 'app-tabfeed',
  templateUrl: './tabfeed.page.html',
  styleUrls: ['./tabfeed.page.scss'],
})
export class TabfeedPage  {
  filtros = true

  constructor() {
    this.getRandomBlocks()
  
  }
  

  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
   
  path = "blocks"
  cardData = [{} as Block] ;

  async getRandomBlocks(){
    this.firebaseSvc.getRandomDocuments(this.path, 5, 1, 15).subscribe((blocks) =>{
      this.cardData = blocks
    }
    )
  }

  
}
