import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit  {
  userId: string
  constructor(private route: ActivatedRoute) { 
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.userId);
    console.log("constructor")
    this.getDataUser()
    this.compFollow()
    this.handleOwnBlock()
  }
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)
  
  userData :User
  cardData = []
  pathBlock = "blocks"
  seguidores={
    follow:0,
    followers: 0
  }
  ngOnInit() {
    console.log("ngoninit")

    // Ahora puedes usar la ID para realizar alguna acción
  
  
  }

  async compFollow(){
    this.seguidores.followers= (await this.firebaseSvc.getDocumentsByParameter('follows', "sid", this.userId)).length
    this.seguidores.follow= (await this.firebaseSvc.getDocumentsByParameter('follows', "fid", this.userId)).length
  }
  async getDataUser(){
    console.log("entre")
    let users
    users  = await this.firebaseSvc.getDocumentsByParameter('users', "uid", this.userId)
    console.log("continue")
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
  handleRefresh(event) {
    setTimeout(() => {
      this.handleOwnBlock()
      event.target.complete();
    }, 2000);
  }
}
