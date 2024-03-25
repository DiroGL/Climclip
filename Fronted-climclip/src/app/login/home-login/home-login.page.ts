import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.page.html',
  styleUrls: ['./home-login.page.scss'],
})
export class HomeLoginPage implements OnInit {

  loginForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private toastController: ToastController, private navctrl : NavController, private navctrl2 : NavController) {
   
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.usuaiosServ.getIUsuarios().subscribe(l=>{l.forEach(u=>this.Usuario.push(u))})
    // this.usuaiosServ.getIUsuarios().subscribe(u => {this.Usuario = u})
    
    
  }
 enviar(){
    // Declaraciones Variables
    let controlusu:any
    let controlpass:any
    var usu:any
    var pass:any

    // Asignamos valores a las variables 
    controlusu = this.loginForm.controls.nombre;
    controlpass = this.loginForm.controls.password;
    // usu =this.Usuario.find((s: { usuario: IUsuario; })=> s.usuario == controlusu.value)
    // usu =this.Usuario.find(s=> s.usuario == controlusu.value)


   



    // Comprobamos ñas variables
    console.log(usu)
    if (usu != undefined){
      if (usu.password != controlpass.value){
        this.mensajeerror("Credenciales Incorrectas");
        
      }else if( usu.perfil != "administrador"){
        this.mensajeerror("Usuario no permitido")
       
      }else{
        this.navctrl.navigateForward(['/lusuarios'])
      }
    
    }else{
      this.mensajeerror("Credenciales Incorrectas")

    }
     
    
    
  }

  registrarse(){
    this.navctrl2.navigateForward(['/registro'])

  }

  async mensajeerror(frase:any) {
    let toast = await this.toastController.create({
      message: frase,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}

