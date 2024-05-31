import { Component, Input, OnInit, inject } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
import { Completed } from 'src/app/login/models/completed.models';
import { Like } from 'src/app/login/models/like.models';
import { Rated } from 'src/app/login/models/rated.models';
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
  likeIcon
  likeColor
  likesBlock
  blocksCompleted
  valorado
  valoraciones = { } as {autor :string, public : string}
  dataLike =  {} as Like;
  userLocal = {} as User;
  dataCompleted = {} as Completed;
  dataRated = {} as Rated;

  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)
  pathLikes = "likes"
  pathCompleted = "completed"
  pathRated = "Rated"


  constructor() {
    
  }
  ngOnInit() {
    // Inicializa el valoración y prueba si es necesario
    this.valorRange = 0;
    this.calcularValores()
    this.obtenerUsuario()
    this.comprobarDatos()
  }
  ionViewWillEnter(){
    
  }
  async obtenerUsuario(){
    this.userLocal= await this.utilSvc.getFromLocalStorage('user')


  }

  async calcularValores (){
    let path = `valorations`

    let getValores = await this.firebaseSvc.getDocumentsByParameter(path, this.cardData.pid, "")
    let PublicValor 

    for (let i = 0; i < getValores.length; i++) {
       PublicValor +=  getValores[i]
    }
    PublicValor = PublicValor/getValores.length
    this.valoraciones = {
      autor : this.utilSvc.getDificultyOfNumber(this.cardData.valorRange),
      public : this.utilSvc.getDificultyOfNumber(PublicValor)
    }

  }
  async comprobarDatos(){
    this.likesBlock  = await this.firebaseSvc.getDocumentsByParameter(this.pathLikes, "pid", this.cardData.pid)
    for (let i = 0; i < this.likesBlock.length; i++) {
      if(this.likesBlock[i].uid == this.userLocal.uid){
        this.like =true
      }
    }
    this.blocksCompleted  = await this.firebaseSvc.getDocumentsByParameter(this.pathCompleted, "pid", this.cardData.pid)
    for (let i = 0; i < this.blocksCompleted.length; i++) {
      if(this.blocksCompleted[i].uid == this.userLocal.uid){
        this.CompletedBlock =true
      }
    }
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

  async meGusta(){
    if (!this.like){
      this.dataLike.uid = this.userLocal.uid
      this.dataLike.pid = this.cardData.pid
      try{
        this.like = !this.like;
        await this.firebaseSvc.addDocument(this.pathLikes, this.dataLike);
      } catch (error) {
        this.like = !this.like;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } finally {
      }
    }else{
      try{
        this.like = !this.like;
        await this.firebaseSvc.deleteDocumentsByParameters(this.pathLikes, "uid", this.userLocal.uid, "pid", this.cardData.pid)
      } catch (error) {
        this.like = !this.like;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } finally {
      }
    }
  }
  async meValorar(){
    
    this.CardValorar = !this.CardValorar
  }

  async CompleteBlock(){
   

    if (!this.CompletedBlock){
      this.dataCompleted.uid = this.userLocal.uid
      this.dataCompleted.pid = this.cardData.pid
      try{
        this.CompletedBlock = !this.CompletedBlock;
        await this.firebaseSvc.addDocument(this.pathCompleted, this.dataCompleted);
        this.utilSvc.presentToast({
          message: "Enhorabuena, a seguir dandole duro bicho!!!!",
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } catch (error) {
        this.CompletedBlock = !this.CompletedBlock;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } finally {
      }
    }else{
      try{
        this.CompletedBlock = !this.CompletedBlock;
        await this.firebaseSvc.deleteDocumentsByParameters(this.pathCompleted, "uid", this.userLocal.uid, "pid", this.cardData.pid)
       
      } catch (error) {
        this.CompletedBlock = !this.CompletedBlock;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } finally {
      }
    }
  }
  async enviarValoracion(){
    this.dificultadPublico = this.utilSvc.getDificultyOfNumber(this.valoracion)
    this.dataRated.dificulty = this.valoracion
    this.dataRated.uid = this.userLocal.uid
    this.dataRated.pid = this.cardData.pid
    if (!this.valorado){
      try{
        this.CompletedBlock = !this.CompletedBlock;
        await this.firebaseSvc.addDocument(this.pathRated, this.dataRated);
        
      } catch (error) {
        this.CompletedBlock = !this.CompletedBlock;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      } finally {
      }
    }else{

    }

  }
  
}
