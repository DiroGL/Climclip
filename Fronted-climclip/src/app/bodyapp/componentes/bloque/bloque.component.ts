import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  getValores
  contadorLikes

  valoraciones = { } as {autor :string, public : string}
  dataLike =  {} as Like;
  userLocal = {} as User;
  userBlock = {} as User;
  dataCompleted = {} as Completed;
  dataRated = {} as Rated;
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)
  pathLikes = "likes"
  pathCompleted = "completed"
  pathRated = "Rated"


  constructor(private router: Router) {
    
  }
  ngOnInit() {
    // Inicializa el valoración y prueba si es necesario
    this.valorRange = 0;
   
    this.obtenerUsuario()
    this.comprobarDatos()
    this.calcularValores()
    this.contarLikes()
  }
  ionViewWillEnter(){
    
  }
  async obtenerUsuario(){
    this.userLocal= await this.utilSvc.getFromLocalStorage('user')
    let userFire = await this.firebaseSvc.getDocument(`users/${this.cardData.uid}`)
    this.userBlock = userFire as User
  }
  async contarLikes(){
    this.contadorLikes = (await this.firebaseSvc.getDocumentsByParameter(this.pathLikes, "pid", this.cardData.pid)).length
    console.log("contador LIkes",this.contadorLikes)
  }

  async calcularValores (){


    this.getValores = await this.firebaseSvc.getDocumentsByParameter(this.pathRated,"pid",  this.cardData.pid)
    let PublicValor =0

    for (let i = 0; i < this.getValores.length; i++) {
       PublicValor +=  this.getValores[i].dificulty
      console.log(PublicValor)
       if( this.getValores[i].uid == this.userLocal.uid){    
        this.dificultadPublico = this.utilSvc.getDificultyOfNumber(this.getValores[i].dificulty)
        this.dataRated = this.getValores[i]
       }
    }
    PublicValor = Math.floor(PublicValor/this.getValores.length)
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
  borrarBlock(){
    try{
      this.firebaseSvc.deleteDocumentByParameter(`blocks`,"pid", this.cardData.pid)
    } catch (error) {
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
        this.contarLikes()
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
        this.contarLikes()
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
        let frases = [
          "Enhorabuena, a seguir dandole duro bicho!!!!", 
          "Yiropa, buen pegue bicho", 
          "Que buena, espero que haya sido al flash", 
          "Sigue asi campeon", 
          "no no no no, no me lo flashes!!", 
          `Estas titanico ${this.userLocal.username} `,
          "Bof ese pegue ha sido quirurjico"  
        ]
         let numRandom = Math.floor(Math.random() * frases.length);
        this.utilSvc.presentToast({
          message: frases[numRandom],
          duration: 3000,
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
    this.dificultadPublico = this.utilSvc.getDificultyOfNumber(this.valoracion);
    if(!this.dataRated.rid){
      this.dataRated.dificulty = this.valoracion;
      this.dataRated.uid = this.userLocal.uid;
      this.dataRated.pid = this.cardData.pid;

      try {
        let p =await this.firebaseSvc.addDocument(this.pathRated, this.dataRated);
        let rid = p.id
        this.dataRated.rid = rid
        let pathRatedBlock = `${this.pathRated}/${this.dataRated.rid}` 
        await this.firebaseSvc.updateDocument(pathRatedBlock, this.dataRated)
        this.utilSvc.presentToast({
          message: 'Valoración enviada correctamente',
          duration: 1500,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });
      // }
    } catch (error) {
      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    }


    }else{
      try {
        this.dataRated.dificulty = this.valoracion;
        let pathRatedBlock = `${this.pathRated}/${this.dataRated.rid}` 
        await this.firebaseSvc.updateDocument(pathRatedBlock, this.dataRated)
        this.utilSvc.presentToast({
          message: 'Valoración cambiada correctamente',
          duration: 1500,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });
      // }
    } catch (error) {
      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    }
    }
   
  }
  goUserDetails(id: string) {
    this.router.navigate(['view-users/', id]);
  }
  }
  
