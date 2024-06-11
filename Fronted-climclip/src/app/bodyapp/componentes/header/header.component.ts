import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { CrearActualizarPublicacionesComponent } from '../crear-actualizar-publicaciones/crear-actualizar-publicaciones.component';
interface RangoEscala {
  lower: number;
  upper: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() filtros : boolean = false
  @Input() userpage : boolean = false
  @Input() backbutton !: string
  @Input() isModal !: boolean
  @Input() addProduct !: boolean
  @Input() title !: string
  @Output() filtrosValue: number[]
  @Input() busqueda

  preferences = false
 
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  preferenicas(){
    this.preferences = !this.preferences
  }
  signOut(){
    this.firebaseSvc.signOut()
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
       
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.signOut()
      },
    },
  ]
  dismissmodal(){
    this.utilSvc.dismissModal()
  }
  addUpdateProduct(){
    this.utilSvc.presentModal(
      {
        component: CrearActualizarPublicacionesComponent,
      }
    )
  }
  
}
