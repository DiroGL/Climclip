import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

import { User } from 'src/app/login/models/user.models';
import { Block } from 'src/app/login/models/block.models';


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
    const dataUrl = (await this.utilSvc.takePicture("imagen del bolque")).dataUrl
    this.addBlock.controls.imagen.setValue(dataUrl)
  }



 async enviar(){
    const loading = await this.utilSvc.loading()
    await loading.present()


    try {
      let publicacion = this.addBlock.value as Block;
      publicacion.uid = this.user.uid;
      publicacion.fechaSubida = Date.now()
      
      // Agregar la publicación y obtener la referencia del documento creado
      const docRef = await this.firebaseSvc.addDocument("blocks", publicacion);
      
      // Guardar la ID generada automáticamente en la variable pid
      const pid = docRef.id;


      let dataUrl = this.addBlock.value.imagen
      let imagenPath = `${pid}`
      let imageUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl)
      this.addBlock.controls.imagen.setValue(imageUrl)



      // Añadir la ID generada automáticamente como un campo en el objeto de la publicación
      publicacion.pid = pid;
    
      // Construir la ruta del documento en Firestore
      const path = `blocks/${pid}`;
    
      // Establecer el documento en Firestore con la ID generada automáticamente como un campo dentro del documento
      await this.firebaseSvc.setDocument(path, publicacion);

      
    
      this.utilSvc.presentToast({
        message: "Publicación enviada exitosamente",
        duration: 1500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      });

    } catch (error) {
      console.log(error);
      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'primary',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    
    }
    
    this.utilSvc.dismissModal()
    // añadir imagen
    

    
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
