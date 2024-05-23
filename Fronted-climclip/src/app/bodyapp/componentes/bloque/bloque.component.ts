import { Component, Input, OnInit, inject } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss'],
})
export class BloqueComponent  implements OnInit {
  @Input() cardData : Block
  CompletedBlock = false;
  CardValorar = false;
  like = false;
  valorRange 
  dificultadPublico
  valoracion 
  valoraciones = { } as {autor :string, public : string}
  userLocal = {} as User;
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)
  constructor() {
    
  }

  async calcularValores (){
    let path = `valorations`

    let getValores = await this.firebaseSvc.getDocumentsByParameter(path, this.cardData.pid, "")
    console.log(getValores)
    let PublicValor 

    for (let i = 0; i < getValores.length; i++) {
       PublicValor +=  getValores[i]
    }
    PublicValor = PublicValor/getValores.length
    console.log("Entre",this.utilSvc.getDificultyOfNumber(this.cardData.valorRange))
    this.valoraciones = {
      autor : this.utilSvc.getDificultyOfNumber(this.cardData.valorRange),
      public : this.utilSvc.getDificultyOfNumber(PublicValor)
    }
  }
  ngOnInit() {
    // Inicializa el valoración y prueba si es necesario
    this.valorRange = 0;
    this.calcularValores()
  }

  ionViewWillEnter(){
    this.userLocal= this.utilSvc.getFromLocalStorage('user') 
    
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
