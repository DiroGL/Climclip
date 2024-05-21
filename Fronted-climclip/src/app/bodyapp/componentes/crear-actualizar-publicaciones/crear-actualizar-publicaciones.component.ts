import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

import { User } from 'src/app/login/models/user.models';


@Component({
  selector: 'app-crear-actualizar-publicaciones',
  templateUrl: './crear-actualizar-publicaciones.component.html',
  styleUrls: ['./crear-actualizar-publicaciones.component.scss'],
})
export class CrearActualizarPublicacionesComponent  implements OnInit {

  addBlock = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[]),
    imagen: new FormControl('',[Validators.required]),
    valorRange:new FormControl(0,[Validators.required]),
  })
  constructor( private navctrl : NavController, private navctrl2 : NavController) {
   
  }

    firebaseSvc = inject(FirebaseService)
    utilSvc = inject(UtilsService)
    user = {}as User;


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.usuaiosServ.getIUsuarios().subscribe(l=>{l.forEach(u=>this.Usuario.push(u))})
    // this.usuaiosServ.getIUsuarios().subscribe(u => {this.Usuario = u})
    
    this.user= this.utilSvc.getFromLocalStorage('user')
  }


  async takeImage(){
    console.log(this.addBlock.value.imagen)
    const dataUrl = (await this.utilSvc.takePicture("imagen del bolque")).dataUrl
    this.addBlock.controls.imagen.setValue(dataUrl)
    console.log(this.addBlock.value.imagen)

  }



 async enviar(){

    const loading = await this.utilSvc.loading()
    await loading.present()

// añadir imagen
    let dataUrl = this.addBlock.value.imagen

    // this.firebaseSvc.singIn(this.addBlock.value).then(res => {

    // }).catch(error => {
    //   console.log(error)
    //   this.utilsSvc.presentToast({
    //     message : error.message,
    //     duration: 1500,
    //     color: 'primary',
    //     position: 'bottom',
    //     icon : 'alert-circle-outline'
      
    //   })
    // }).finally(() =>{
    //   loading.dismiss();
    // }) 
  }
  valorBloque(event:any){
    this.addBlock.value.valorRange = event.detail.value;
  }
  updatePin(value: number){
    let rangosVisual: string[] = [
      "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
      "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+" 
    ];
    return rangosVisual[value]
  }



}
