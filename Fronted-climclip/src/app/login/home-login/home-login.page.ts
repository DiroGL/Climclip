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
  politicasDePrivacidad(){
    this.utilsSvc.routerlink("politicas-de-privacidad")

  }

  politicasDeUso(){
    this.utilsSvc.routerlink("politicas-de-uso")
  }
 async enviar(){

    const loading = await this.utilsSvc.loading()
    await loading.present()


    this.firebaseSvc.signIn(this.loginForm.value as User).then(res => {

      this.getuserInfo(res.user.uid)
    }).catch(error => {

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


    this.firebaseSvc.getDocument(path).then( (user :User) => {
     
    this.utilsSvc.saveInLocalStorage('user', user) 
    this.utilsSvc.routerlink('tabfeed')
    this.loginForm.reset();



    this.utilsSvc.presentToast({
      message : `Te damos la bienvenido ${user.name}`,
      duration: 1500,
      color: 'primary',
      position: 'bottom',
      icon : 'person-circle-outline'
    
    })

    }).catch(error => {

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
  async logInWithGoogle() {
    // const loading = await this.utilsSvc.loading();
    // await loading.present();
  
      await this.firebaseSvc.signUpWithGoogle().then(res=>{
        let path = `users/${res.user.uid}`

        this.firebaseSvc.getDocument(path).then( (user :User) => {
          if (user){
            this.utilsSvc.saveInLocalStorage('user', user) 
            this.utilsSvc.routerlink('tabfeed')
            this.loginForm.reset();
            this.utilsSvc.presentToast({
              message : `Te damos la bienvenido ${user.username}`,
              duration: 1500,
              color: 'primary',
              position: 'bottom',
              icon : 'person-circle-outline'
            
            })
          }else{
            let user: User={
              name : res.user.displayName,
              email : res.user.email,
              uid : res.user.uid,
              username : res.user.displayName.toLowerCase(),
              image : res.user.photoURL
            }
            this.firebaseSvc.setDocument(path, user)
            this.utilsSvc.saveInLocalStorage('user', user) 
            this.utilsSvc.routerlink('tabfeed')
          }
      })
      }).catch(error=>{
        
        this.utilsSvc.presentToast({
          message: 'Error al iniciar sesión con Google.',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });  
      }).finally(()=>{
        // loading.dismiss();
      });
  }

  resetPassword(){
    this.utilsSvc.routerlink('/reset-password')

  }


}

