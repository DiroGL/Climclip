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
  prueba
  utilSvc = inject(UtilsService)
  constructor() {
    
  }
  
  ionViewWillEnter(){
   
  }
  updatePin(value: number){
    return this.utilSvc.getDificultyOfNumber(value)
  }
  ionViewDidEnter(){

  }



 

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  
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
}
