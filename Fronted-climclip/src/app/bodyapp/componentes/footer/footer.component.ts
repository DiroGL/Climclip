import { Component, OnInit, inject, Input } from '@angular/core';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  @Input() selected = 0
  constructor() {
    
  }
  utilSvc = inject(UtilsService)

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  moveTabfeed(){
    this.utilSvc.routerlink('tabfeed')
  }
  moveSearchBar(){
    this.utilSvc.routerlink('searchpage')
  }
  moveUserProfile(){
    this.utilSvc.routerlink('userprofile')
  }
}
