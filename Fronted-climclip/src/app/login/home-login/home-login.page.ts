import { User } from './../models/user.models';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilsService } from '../servicios/utils.service';
import {GoogleAuth, User as GUser} from '@codetrix-studio/capacitor-google-auth';
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

    }


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
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
  async signIn() {
    //User Authentication
    const user: GUser = await GoogleAuth.signIn();
    console.log(user)
  }


  // async checkRedirectResult() {
  //   try {
  //     const res = await this.firebaseSvc.handleRedirectResult();
      
  //     if (res && res.user) {
  //       const uid = res.user.uid;
  //       const path = `users/${uid}`;
        
  //       // Verificar si el usuario ya existe en Firestore
  //       const user = await this.firebaseSvc.getDocument(path);
        
  //       if (user) {
  //         // Usuario existente, guardar en localStorage y redirigir
  //         this.utilsSvc.saveInLocalStorage('user', user);
  //         this.utilsSvc.routerlink('tabfeed');
  //         this.utilsSvc.presentToast({
  //           message: `Bienvenido de nuevo, ${user['username']}`,
  //           duration: 1500,
  //           color: 'primary',
  //           position: 'bottom',
  //           icon: 'person-circle-outline'
  //         });
  //       } else {
  //         // Nuevo usuario, crear y guardar en Firestore
  //         const newUser = {
  //           uid: uid,
  //           name: res.user.displayName || '',
  //           email: res.user.email || '',
  //           username: res.user.displayName ? res.user.displayName.toLowerCase() : '',
  //           image: res.user.photoURL || ''
  //         };
          
  //         await this.firebaseSvc.setDocument(path, newUser);
          
  //         this.utilsSvc.saveInLocalStorage('user', newUser);
  //         this.utilsSvc.routerlink('tabfeed');
  //         this.utilsSvc.presentToast({
  //           message: `Bienvenido, ${newUser.name}`,
  //           duration: 1500,
  //           color: 'primary',
  //           position: 'bottom',
  //           icon: 'person-circle-outline'
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error handling redirect result:', error);
      
  //     this.utilsSvc.presentToast({
  //       message: 'Error al manejar la redirección de Google.',
  //       duration: 2500,
  //       color: 'danger',
  //       position: 'middle',
  //       icon: 'alert-circle-outline'
  //     });
  //   }
  // }

  async logInWithGoogle() {
    try {
      let GUser = await this.firebaseSvc.signInWithGoogle() 
      console.log(GUser)
      if (GUser) {
             
              const uid = GUser.uid;
              const path = `users/${uid}`;
              
              // Verificar si el usuario ya existe en Firestore
              const user = await this.firebaseSvc.getDocument(path);
              
              if (user) {
                // Usuario existente, guardar en localStorage y redirigir
                this.utilsSvc.saveInLocalStorage('user', user);
                this.utilsSvc.routerlink('tabfeed');
                this.utilsSvc.presentToast({
                  message: `Bienvenido de nuevo, ${user['username']}`,
                  duration: 1500,
                  color: 'primary',
                  position: 'bottom',
                  icon: 'person-circle-outline'
                });
              } else {
                // Nuevo usuario, crear y guardar en Firestore
                   const NewUser = {
                      uid : GUser.uid,
                      name: GUser.displayName || '',
                      email: GUser.email || '',
                      username: GUser.displayName ? GUser.displayName.toLowerCase() : '',
                      image: GUser.photoURL || ''
                    }
                
                await this.firebaseSvc.setDocument(path, NewUser as User);
                
                this.utilsSvc.saveInLocalStorage('user', NewUser as User);
                this.utilsSvc.routerlink('tabfeed');
                this.utilsSvc.presentToast({
                  message: `Bienvenido, ${NewUser.username}`,
                  duration: 1500,
                  color: 'primary',
                  position: 'bottom',
                  icon: 'person-circle-outline'
                });
              }
            }
    }catch (error){
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }finally {

    }

   
  }







  resetPassword(){
    this.utilsSvc.routerlink('/reset-password')

  }


}

