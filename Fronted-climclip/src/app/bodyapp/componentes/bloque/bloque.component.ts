import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss'],
})
export class BloqueComponent  implements OnInit {
  cardData = {
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+'
  };
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

}
