import { updateProfile } from 'firebase/auth';
import { FirebaseService } from './../servicios/firebase.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.models';
import { UtilsService } from '../servicios/utils.service';
import { NavController } from '@ionic/angular';
    





  
    
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    repassword: new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    username : new FormControl('',[Validators.required])
  })

  constructor ( private navcrtl1 :NavController){

  }
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  async registrar(){
    const loading = await this.utilsSvc.loading()
    await loading.present()

    console.log(this.registerForm.value as User)
    this.firebaseSvc.singUp(this.registerForm.value as User).then(async res => {
      await this.firebaseSvc.updateUser(this.registerForm.value.username)
      
      let uid = res.user.uid;
      this.registerForm.controls.uid.setValue(uid)

      this.setuserInfo(uid)

    }).catch(error => {
      // Aquí interceptamos el error
      var errorCode = error.code;
      var errorMessage = error.message;

      
      // Personaliza el mensaje de error
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está registrado. Por favor, usa otro.";
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = "El correo electrónico proporcionado no es válido.";
      } else if (errorCode === 'auth/operation-not-allowed') {
        errorMessage = "El registro de correo electrónico y contraseña no está habilitado.";
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
      } else {
        errorMessage = "Ocurrió un error desconocido. Por favor, intenta nuevamente.";
      }
      // Muestra el mensaje personalizado
      console.error("Error: ", errorMessage);
     
    console.log(error)
      console.log(error)
      this.utilsSvc.presentToast({
        message : errorMessage,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon : 'alert-circle-outline'
      
      })
    }).finally(() =>{
      loading.dismiss();
     
    })
    this.navcrtl1.navigateForward['/home-login']
  }

  async setuserInfo(uid:string){
    const loading = await this.utilsSvc.loading()
    await loading.present()

    let path = `users/${uid}`
    delete this.registerForm.value.password;
    delete this.registerForm.value.repassword;


    console.log(this.registerForm.value as User)
    this.firebaseSvc.setDocument(path, this.registerForm.value).then(async res => {
     
    this.utilsSvc.saveInLocalStorage('user', this.registerForm.value) 
    this.utilsSvc.routerlink('home-login')
    this.registerForm.reset();

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


}
