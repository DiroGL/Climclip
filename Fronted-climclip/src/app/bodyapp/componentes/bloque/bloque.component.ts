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
  like = false;
 
  
  
  constructor() {
 
  }
  
  ionViewWillEnter(){
   
  }
  updatePin(value: number){
    let rangosVisual: string[] = [
      "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
      "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+" 
    ];
    return rangosVisual[value]
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