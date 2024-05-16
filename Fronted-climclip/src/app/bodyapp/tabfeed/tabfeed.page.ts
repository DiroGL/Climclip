import { Component, OnInit } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { CrearActualizarPublicacionesComponent } from '../componentes/crear-actualizar-publicaciones/crear-actualizar-publicaciones.component';


@Component({
  selector: 'app-tabfeed',
  templateUrl: './tabfeed.page.html',
  styleUrls: ['./tabfeed.page.scss'],
})
export class TabfeedPage implements OnInit {
  filtros = true
  constructor() {
    
  
  }

  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
   
  cardData = [{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  },{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  },{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  },{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  },{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  },{
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+',
    valoration: '7C'
  }];

  ngOnInit() {

  }
}
