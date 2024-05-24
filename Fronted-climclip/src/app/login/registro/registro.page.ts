import { updateProfile } from 'firebase/auth';
import { FirebaseService } from './../servicios/firebase.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.models';
import { UtilsService } from '../servicios/utils.service';
import { NavController} from '@ionic/angular';
import { passwordComplexityValidator, passwordMatchValidator } from './custom-validators';
    





  
    
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, passwordComplexityValidator()]),
    repassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator('password', 'repassword') });

  constructor ( private navcrtl1 :NavController){

  }
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)


  showTooltip = false;
  errores
  


  actualizarErrores() {
    this.errores = '';
  
    const controls = this.registerForm.controls;
  
    // Comprobación de nombre
    if (controls['name'].errors && (controls['name'].touched || controls['name'].dirty)) {
      if (controls['name'].errors['required']) {
        this.errores += 'Nombre completo es requerido. ';
      }
    }
  
    // Comprobación de correo
    if (controls['email'].errors && (controls['email'].touched || controls['email'].dirty)) {
      if (controls['email'].errors['required']) {
        this.errores += 'Correo es requerido. ';
      }
      if (controls['email'].errors['email']) {
        this.errores += 'Correo inválido. ';
      }
    }
  
    // Comprobación de nombre de usuario
    if (controls['username'].errors && (controls['username'].touched || controls['username'].dirty)) {
      if (controls['username'].errors['required']) {
        this.errores += 'Nombre de usuario es requerido. ';
      }
    }
  
    // Comprobación de contraseña
    if (controls['password'].errors && (controls['password'].touched || controls['password'].dirty)) {
      if (controls['password'].errors['required']) {
        this.errores += 'Contraseña es requerida. ';
      }
      if (controls['password'].errors['passwordComplexity']) {
        this.errores += 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números. ';
      }
    }
  
    // Comprobación de repetir contraseña
    if (controls['repassword'].errors && (controls['repassword'].touched || controls['repassword'].dirty)) {
      if (controls['repassword'].errors['required']) {
        this.errores += 'Repetir contraseña es requerida. ';
      }
      if (controls['repassword'].errors['passwordMismatch']) {
        this.errores += 'Las contraseñas no coinciden. ';
      }
    }
  
    // Actualizar mensaje de error en el ion-text
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  async registrar(){
      if (this.registerForm.valid){
        const loading = await this.utilsSvc.loading()
        await loading.present()

        console.log(this.registerForm.value as User)
        this.firebaseSvc.signUp(this.registerForm.value as User).then(async res => {
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
