/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilsService } from '../servicios/utils.service';
import { User } from '../models/user.models';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPassword = new FormGroup({
    email: new FormControl('',[Validators.required]),
  })

    firebaseSvc = inject(FirebaseService)
    utilsSvc = inject(UtilsService)
  constructor() {

   }

  ngOnInit() {
  }

  async enviar(){

    const loading = await this.utilsSvc.loading()
    await loading.present()


    this.firebaseSvc.sendRecoveryEmail(this.resetPassword.value.email).then(res => {
      this.utilsSvc.routerlink('/home-login')
      this.utilsSvc.presentToast({
        message : `Te hemos enviado un correo de cambio de contraseña`,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon : 'mail-outline'
      
      })
      this.resetPassword.reset()

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
}



