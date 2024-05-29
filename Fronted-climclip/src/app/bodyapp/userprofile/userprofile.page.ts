import { Component, Input, OnInit, inject } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
import { Like } from 'src/app/login/models/like.models';
import { User } from 'src/app/login/models/user.models';

import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {


  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)
  userLocal = {} as User;
  cardData = []

  ownBlocks = true
  likesBlocks = false
  markedBlocks = false
  pathBlock = "blocks"
  pathLikes = "likes"
  pathMarked = "completed"
  likes = []
  completed = []
  constructor() {
   

    
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
   
  }
  ionViewWillLeave(){
    this.utilSvc.saveInLocalStorage('user', this.userLocal);
  }
  ionViewWillEnter(){
    this.userLocal= this.utilSvc.getFromLocalStorage('user')
  
    this.handleOwnBlock()
  }
  async handleOwnBlock(){

    this.ownBlocks = true
    this.likesBlocks = false
    this.markedBlocks = false
    this.cardData =(await this.firebaseSvc.getDocumentsByParameter(this.pathBlock,"uid",this.userLocal.uid))
    this.cardData.sort((a, b) => {
      const dateA = new Date(a.fechaSubida);
      const dateB = new Date(b.fechaSubida);

      // return dateA.getTime() - dateB.getTime(); // Orden ascendente (del más antiguo al más reciente)
      return dateB.getTime() - dateA.getTime(); // Orden descendente (del más reciente al más antiguo)
    });
  }
  

  async handleLikesBlocks(){
    this.cardData = []
    this.likes = []
    this.likes =await this.firebaseSvc.getDocumentsByParameter(this.pathLikes,"uid",this.userLocal.uid)
    for (let i = 0; i < this.likes.length; i++) {
      this.cardData.push(await this.firebaseSvc.getDocument(`blocks/${this.likes[i].pid}`))
    } 
    this.ownBlocks = false
    this.likesBlocks = true
    this.markedBlocks = false


  }
  
  async handleMarkedBlock(){
    this.cardData = []
    this.completed=[]
    this.completed =await this.firebaseSvc.getDocumentsByParameter(this.pathMarked,"uid",this.userLocal.uid)
    for (let i = 0; i < this.completed.length; i++) {
      this.cardData.push(await this.firebaseSvc.getDocument(`blocks/${this.completed[i].pid}`))
    } 
    this.ownBlocks = false
    this.likesBlocks = false
    this.markedBlocks = true
  }

  async changePhoto(){
    const loading = await this.utilSvc.loading()
    await loading.present()
   
   
    try {

    
      let path = `users/${this.userLocal.uid}`
      let dataUrl = (await this.utilSvc.takePicture("¿Cambiar foto de perfil?")).dataUrl;
      let imagenPath = `${this.userLocal.uid}/userImage`
      let imageUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl)
      // this.userLocal.image = imageUrl
      setTimeout(async () => {
      await this.firebaseSvc.updateDocument(path, {"image":imageUrl});
      }, 5000)
      this.userLocal.image = imageUrl
      this.utilSvc.presentToast({
        message: "Foto Cambiada correctamente",
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    }catch(error) {
    console.log(error);
  ;
      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    
    
  } finally {
    loading.dismiss();
  
  }
  
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.handleOwnBlock()
      event.target.complete();
    }, 2000);
  }
}
