import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage  {
  userId: string
    
  userLocal = {} as User
  isFollow
  userData :User
  cardData = []
  pathBlock = "blocks"

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.userLocal = this.utilSvc.getLocalUser() as User
    console.log("constructor",this.userLocal )
    this.userId = this.route.snapshot.paramMap.get('id');
    this.compFollow()
    this.getDataUser()
    this.handleOwnBlock()

  
  }
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)

 
  seguidores={
    follow:0,
    followers: 0
  }

  async compFollow(){
    if ((await this.firebaseSvc.getDocumentsByTwoParameters('follows','fid',this.userId,'uid', this.userLocal.uid)).length> 0){
      this.isFollow = true
    }else{
      this.isFollow = false
    }
    this.seguidores.followers= (await this.firebaseSvc.getDocumentsByParameter('follows', "uid", this.userId)).length
    this.seguidores.follow= (await this.firebaseSvc.getDocumentsByParameter('follows', "fid", this.userId)).length
  
  }
  async getDataUser(){
    let users
    users  = await this.firebaseSvc.getDocumentsByParameter('users', "uid", this.userId)
    console.log(users)
    if (users){
      this.userData = users[0]
    }else{
      this.utilSvc.presentToast({
        message: "Usuario no encontrado",
        duration: 2000,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
      this.utilSvc.routerlink('userprofile')
    }
  }
  async handleOwnBlock(){
    this.cardData =(await this.firebaseSvc.getDocumentsByParameter(this.pathBlock,"uid",this.userId))
    this.cardData.sort((a, b) => {
      const dateA = new Date(a.fechaSubida);
      const dateB = new Date(b.fechaSubida);

      // return dateA.getTime() - dateB.getTime(); // Orden ascendente (del más antiguo al más reciente)
      return dateB.getTime() - dateA.getTime(); // Orden descendente (del más reciente al más antiguo)
    });
  }
  handleRefresh(event?) {
    setTimeout(() => {
      this.handleOwnBlock()
      event?.target?.complete();
    }, 2000);
  }
  async follow(){
    if (!this.isFollow){
      try{
        this.isFollow = !this.isFollow;
        let dataFollowers ={
          uid: this.userLocal.uid,
          fid: this.userId
        }
       let a = await this.firebaseSvc.addDocument('follows',dataFollowers)
      }catch(error){
        this.isFollow = !this.isFollow;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }finally{
        this.compFollow()
      }
    }else{
      try{
        this.isFollow = !this.isFollow;
        let dataFollowers ={
          uid: this.userLocal.uid,
          fid: this.userId
        }
        let a = await this.firebaseSvc.deleteDocumentsByParameters('follows', "uid", this.userLocal.uid,"fid", this.userId)
      }catch(error){
        this.isFollow = !this.isFollow;
        console.log("Entre en el error")
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }finally{
        this.compFollow()
      }
    }
  }
}
