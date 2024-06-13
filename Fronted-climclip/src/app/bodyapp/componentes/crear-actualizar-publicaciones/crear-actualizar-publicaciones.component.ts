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
    uid:new FormControl('',[]),
    pid:new FormControl('',[]),
    fecha:new FormControl(0,[])
  })
  constructor( private navctrl : NavController, private navctrl2 : NavController) {
    
  }

    firebaseSvc = inject(FirebaseService)
    utilSvc = inject(UtilsService)
    userLocal = {}as User;
    pid
    path
    publicacion= {}as  Block;
    creado = false
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.usuaiosServ.getIUsuarios().subscribe(l=>{l.forEach(u=>this.Usuario.push(u))})
    // this.usuaiosServ.getIUsuarios().subscribe(u => {this.Usuario = u})

      this.obtenerUsuraio()
  }
  ionViewWillLeave() {
    if (!this.creado){
      console.log("entreeeee")
      this.firebaseSvc.deleteDocumentByPath(this.path)
    }
  }
  async obtenerUsuraio(){
    this.userLocal= await this.utilSvc.getFromLocalStorage('user')
    this.crearDoc()  
  }
  async crearDoc(){
    this.publicacion.uid = this.userLocal.uid;
    this.addBlock.controls.fecha.setValue(Date.now())
    this.addBlock.controls.uid.setValue(this.userLocal.uid)
    let docRef = await this.firebaseSvc.addDocument("blocks", this.publicacion);
    this.pid = docRef.id
    this.path = `blocks/${this.pid}`;
    this.addBlock.controls.pid.setValue(this.pid)
  }

  async takeImage(){  
    const loading = await this.utilSvc.loading()
    await loading.present()
    try{

      const dataUrl = (await this.utilSvc.takePicture("imagen del bolque")).dataUrl

      let imagenPath = `${this.userLocal.uid}/block/${this.pid}`
      let imageUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl)
    
      this.addBlock.controls.imagen.setValue(imageUrl)
    }catch(error){
      this.utilSvc.presentToast({
        message:  error.message,
        duration: 2500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      });
    }finally{
      loading.dismiss()
    }
 
  }



 async enviar(){
    const loading = await this.utilSvc.loading()
    await loading.present()
    try {
      this.publicacion = this.addBlock.value as Block
      this.publicacion.nombre = this.publicacion.nombre.toLowerCase()

      // Agregar la publicación y obtener la referencia del documento creado
      await this.firebaseSvc.setDocument(this.path, this.publicacion);
  
      this.utilSvc.presentToast({
        message: "Publicación enviada exitosamente",
        duration: 2000,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      });
      this.creado = true
    } catch (error) {
      this.creado = false
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
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
