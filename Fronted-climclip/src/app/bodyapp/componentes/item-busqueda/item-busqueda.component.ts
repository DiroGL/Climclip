import { Component, Input, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.scss'],
})
export class ItemBusquedaComponent   {
  @Input() block : Block
  @Input() user : User
  userLocal
  utilSvc = inject(UtilsService)
  constructor(private router: Router) {  this.userLocal= this.utilSvc.getFromLocalStorage('user')}

  clickUser(id: string){

    if (this.userLocal.uid == id){
      this.router.navigate(['userprofile']);
    }else{
      this.router.navigate(['view-users/', id]);
    }
  }
  clickBlock(){
    
  }

}
