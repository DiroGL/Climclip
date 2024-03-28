import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss'],
})
export class BloqueComponent  implements OnInit {
  cardData = {
    imageUrl: './Captura de pantalla 2024-03-24 a las 1.17.56.png',
    title: 'Ejemplo 1',
    author: 'Autor1',
    difficulty: '8A+'
  };
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

}
