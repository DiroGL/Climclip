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
  @Input() follow: boolean
  @Input() isFlowing : boolean
  @Input() uidFollow: string
  @Input() uidUser:string
  @Input() userProfile:boolean
  @Input() userImage:string

  preferences = false
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  preferenicas(){
    this.preferences = !this.preferences
  }
  signOut(){
    this.firebaseSvc.signOut()
  }
 async compFollow(){
    if ((await this.firebaseSvc.getDocumentsByTwoParameters('follows','fid',this.uidFollow,'uid', this.uidUser)).length> 0){
      this.isFlowing = true
    }else{
      this.isFlowing = false
    }
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
  async makeFollow(){
    // this.compFollow()
    if (!this.isFlowing){
      try{
        this.isFlowing = !this.isFlowing;
        let dataFollowers ={
          uid: this.uidUser,
          fid: this.uidFollow
        }
        await this.firebaseSvc.addDocument('follows',dataFollowers)
      }catch(error){
        this.isFlowing = !this.isFlowing;
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }finally{
        this.compFollow()
      }
    }else{
      try{
        this.isFlowing = !this.isFlowing;
        let dataFollowers ={
          uid: this.uidUser,
          fid: this.uidFollow
        }
        await this.firebaseSvc.deleteDocumentsByParameters('follows', "uid", this.uidUser,"fid", this.uidFollow)
      }catch(error){
        this.isFlowing = !this.isFlowing;
        console.log("Entre en el error")
        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }finally{
        this.compFollow()
      }
    }
  }
  searchIcon(){
    this.utilSvc.routerlink("searchpage")
  }
  goUserProfile(){
    this.utilSvc.routerlink("userprofile")
  }
}
