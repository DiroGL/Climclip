import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
   formUpdateUser = new FormGroup({
    imagen: new FormControl(''),
    name: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl('')
  })
  utilSvc = inject(UtilsService)
  firebaseSvc = inject(FirebaseService)



  //Declaraciones
  userLocal ={}as User
  userProfile ="userprofile"

  constructor() { }

  ngOnInit() {
    this.obtenerDatosUsuario()
  }
  async obtenerDatosUsuario(){
    this.userLocal = await this.utilSvc.getFromLocalStorage('user')
    this.userLocal.image ? this.formUpdateUser.controls.imagen.setValue(this.userLocal.image) : this.userLocal.image =""
    this.formUpdateUser.controls.name.setValue(this.userLocal.name)
    this.formUpdateUser.controls.username.setValue(this.userLocal.username)
    this.userLocal.bio ?this.formUpdateUser.controls.bio.setValue(this.userLocal.bio):this.userLocal.bio = ""

    
  }


  enviar(){
    let userForm = this.formUpdateUser.value as User
    let pathUSer =`users/${this.userLocal.uid}`
    this.firebaseSvc.setDocument(pathUSer, userForm)

      try {
      this.userLocal.bio != userForm.bio ? this.userLocal.bio = userForm.bio : this.userLocal.bio = userForm.bio
      this.userLocal.name != userForm.name ? this.userLocal.name = userForm.name : this.userLocal.name
      this.userLocal.username != userForm.username ? this.userLocal.username = userForm.username : this.userLocal.username
        console.log(this.userLocal.image)
        this.firebaseSvc.setDocument(pathUSer, this.userLocal)
        this.utilSvc.saveInLocalStorage("user",this.userLocal)
        
        this.utilSvc.presentToast({
          message: "Informacion actualizada",
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }catch(error) {

        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
    } finally {
      this.utilSvc.routerlink(this.userProfile)
    
    }
  }

  async changePhoto(){
    const loading = await this.utilSvc.loading()
    await loading.present()
   
   
    try {
      let path = `users/${this.userLocal.uid}`
      let dataUrl = (await this.utilSvc.takePicture("¿Cambiar foto de perfil?")).dataUrl;
      let imagenPath = `${this.userLocal.uid}/userImage`
      let imageUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl)
      // this.userLocal.image = imageUrl
      setTimeout(async () => {
      await this.firebaseSvc.updateDocument(path, {"image":imageUrl});
      }, 5000)
      this.userLocal.image = imageUrl
      this.utilSvc.presentToast({
        message: "Foto Cambiada correctamente",
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    }catch(error) {
  ;
      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    
    
  } finally {
    loading.dismiss();
  
  }}

}
