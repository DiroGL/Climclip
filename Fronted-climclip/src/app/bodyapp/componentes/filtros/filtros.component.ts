import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent  implements OnInit {
  rangosInternos: number[] = Array.from({length: 16}, (_, i) => i); // Valores internos del rango
  rangosVisuales: string[] = [
    "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", // Valores visuales correspondientes a los grados de escalada
    "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+"
  ];

  rangoEscala: { lower: number, upper: number } = { lower: 0, upper: this.rangosInternos.length - 1 };

 

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  
}
