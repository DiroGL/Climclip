import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';



@Component({
  selector: 'app-crear-actualizar-publicaciones',
  templateUrl: './crear-actualizar-publicaciones.component.html',
  styleUrls: ['./crear-actualizar-publicaciones.component.scss'],
})
export class CrearActualizarPublicacionesComponent  implements OnInit {

  addBlock = new FormGroup({
    id: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[]),
    descripcion: new FormControl('',[]),
    valoracion: new FormControl('',[Validators.required])

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
 async enviar(){

    const loading = await this.utilsSvc.loading()
    await loading.present()

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
  updatePin(value: number){
    let rangosVisual: string[] = [
      "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
      "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+" 
    ];
    return rangosVisual[value]
  }

}
