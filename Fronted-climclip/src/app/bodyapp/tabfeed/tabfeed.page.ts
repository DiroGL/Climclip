import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabfeed',
  templateUrl: './tabfeed.page.html',
  styleUrls: ['./tabfeed.page.scss'],
})
export class TabfeedPage implements OnInit {
  filtros = true
  constructor() {
    
  
  }

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
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {

  }

}
