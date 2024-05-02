import { Component, Input, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
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
  preferences = false
 
  firebaseSvc = inject(FirebaseService)
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  preferenicas(){
    this.preferences = !this.preferences
  }
  singOut(){
    this.firebaseSvc.singOut()
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
        this.singOut()
      },
    },
  ]

  
}
