import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { ListaUsersPage } from '../lista-users/lista-users.page';

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
  
 
  uidFollow: string



  constructor(private route: ActivatedRoute, private router: Router) { 
    this.userLocal = this.utilSvc.getLocalUser() as User
    this.userId = this.route.snapshot.paramMap.get('id');
    this.compFollow()
    this.getDataUser()
    this.handleOwnBlock()

  
  }
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)

 
  seguidores={
    follow:[],
    followers: []
  }

  async compFollow(){
    if ((await this.firebaseSvc.getDocumentsByTwoParameters('follows','fid',this.userId,'uid', this.userLocal.uid)).length> 0){
      this.isFollow = true
    }else{
      this.isFollow = false
    }
    this.seguidores.followers= (await this.firebaseSvc.getDocumentsByParameter('follows', "fid", this.userId))
    this.seguidores.follow= (await this.firebaseSvc.getDocumentsByParameter('follows', "uid", this.userId))
  
  }
  async getDataUser(){
    let users
    users  = await this.firebaseSvc.getDocumentsByParameter('users', "uid", this.userId)

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
  

  async verSeguidos(){
    await this.compFollow()
    let followShow  = []
    this.seguidores.follow.forEach(async element=> {
      followShow.push(await this.firebaseSvc.getDocument(`users/${element.fid}`)as User)
    });
    this.utilSvc.presentModal({
        component: ListaUsersPage,
        componentProps: {
          itemData: followShow,
  
        }
    }
    )
  }
  async verSeguidores(){
    await this.compFollow()
    let followerShow = []
    this.seguidores.followers.forEach(async element=> {
      followerShow.push(await this.firebaseSvc.getDocument(`users/${element.uid}`)as User)
    });
    

    this.utilSvc.presentModal({
      component: ListaUsersPage,
      componentProps: {
        itemData: followerShow,
      }
  }
  )
  }
}
