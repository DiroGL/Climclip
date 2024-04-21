import { User } from './../models/user.models';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilsService } from '../servicios/utils.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.page.html',
  styleUrls: ['./home-login.page.scss'],
})
export class HomeLoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor( private navctrl : NavController, private navctrl2 : NavController) {
   
  }

    firebaseSvc = inject(FirebaseService)
    utilsSvc = inject(UtilsService)



  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.usuaiosServ.getIUsuarios().subscribe(l=>{l.forEach(u=>this.Usuario.push(u))})
    // this.usuaiosServ.getIUsuarios().subscribe(u => {this.Usuario = u})
    
    
  }
 async enviar(){

    const loading = await this.utilsSvc.loading()
    await loading.present()

    console.log(this.loginForm.value as User)
    this.firebaseSvc.singIn(this.loginForm.value as User).then(res => {

      this.getuserInfo(res.user.uid)
    }).catch(error => {
      console.log(error)
      this.utilsSvc.presentToast({
        message : error.message,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon : 'alert-circle-outline'
      
      })
    }).finally(() =>{
      loading.dismiss();
    })





  
    
  }

  registrarse(){
    this.utilsSvc.routerlink('/registro')
  }

  async getuserInfo(uid:string){
    const loading = await this.utilsSvc.loading()
    await loading.present()

    let path = `users/${uid}`



    console.log(this.loginForm.value as User)
    this.firebaseSvc.getDocument(path).then( (user :User) => {
     
    this.utilsSvc.saveInLocalStorage('user', user) 
    // this.utilsSvc.routerlink('feed-page')
    this.loginForm.reset();



    this.utilsSvc.presentToast({
      message : `Te damos la bienvenido ${user.name}`,
      duration: 1500,
      color: 'primary',
      position: 'bottom',
      icon : 'person-circle-outline'
    
    })

    }).catch(error => {
      console.log(error)
      this.utilsSvc.presentToast({
        message : error.message,
        duration: 2500,
        color: 'primary',
        position: 'bottom',
        icon : 'alert-circle-outline'
      
      })
    }).finally(() =>{
      loading.dismiss();
     
    })
  }

  resetPassword(){
    this.utilsSvc.routerlink('/reset-password')

  }


}

