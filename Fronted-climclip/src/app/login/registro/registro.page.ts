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
    nombre: new FormControl('',[Validators.required]),
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
    this.navcrtl1.navigateForward['/home-login']
  }

}
