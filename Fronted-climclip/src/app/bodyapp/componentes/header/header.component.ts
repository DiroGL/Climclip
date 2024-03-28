import { Component, Input, OnInit } from '@angular/core';
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
  preferences = false
 
  
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  preferenicas(){
    this.preferences = !this.preferences
  }


}
