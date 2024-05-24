import { Component, Input, OnInit, inject } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
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

  ownBlocks = true
  likesBlocks = false
  markedBlocks = false
  cardData = []
  pathBlock = "blocks"
  constructor() {
   

    
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
   
  }
ionViewWillEnter(){
    this.userLocal= this.utilSvc.getFromLocalStorage('user')
  
    this.handleOwnBlock()
  }
  async handleOwnBlock(){
    this.ownBlocks = true
    this.likesBlocks = false
    this.markedBlocks = false
    this.cardData =await this.firebaseSvc.getDocumentsByParameter(this.pathBlock,"uid",this.userLocal.uid)
    
  }
  

  handleLikesBlocks(){
    this.ownBlocks = false
    this.likesBlocks = true
    this.markedBlocks = false
  }
  
  handleMarkedBlock(){
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
