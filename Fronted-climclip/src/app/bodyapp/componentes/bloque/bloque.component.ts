import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss'],
})
export class BloqueComponent  implements OnInit {
  @Input() cardData : any
  CompletedBlock = false;
  CardValorar = false;
  like = false;
  valorRange
  dificultadPublico
  valoracion


  utilSvc = inject(UtilsService)
  constructor() {
    
  }
  ngOnInit() {
    // Inicializa el valoración y prueba si es necesario
    this.valorRange = 0;

  }

  ionViewWillEnter(){
   
  }
  valorBloque(event: any) {
    this.valoracion = event.detail.value;
    this.valorRange = this.valoracion

  }
  updatePin(value){
    let rangosVisual: string[] = [
      "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
      "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A" 
    ];
    if (value >= rangosVisual.length || value < 0){
      return null
    }
    return rangosVisual[value]
  }

  meGusta(){
    this.like = !this.like;
  }
  meValorar(){
    this.CardValorar = !this.CardValorar
    
  }

  CompleteBlock(){
    this.CompletedBlock = !this.CompletedBlock
  }
  enviarValoracion(){
    console.log(this.utilSvc.getDificultyOfNumber(this.valoracion))
    this.dificultadPublico = this.utilSvc.getDificultyOfNumber(this.valoracion)
  }
}
