import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss'],
})
export class BloqueComponent  implements OnInit {
  @Input() cardData : any
  CompletedBlock = false;
  CardValorar = false;
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}


  meGusta(){

  }
  meValorar(){
    this.CardValorar =! this.CardValorar
  }

  CompleteBlock(){
    this.CompletedBlock = !this.CompletedBlock
  }
}
