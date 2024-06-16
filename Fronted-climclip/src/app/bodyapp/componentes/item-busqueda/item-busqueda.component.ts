import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { BloqueComponent } from '../bloque/bloque.component';
import { ViewBlockComponent } from '../view-block/view-block.component';

@Component({
  selector: 'app-item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.scss'],
})
export class ItemBusquedaComponent implements OnInit   {
  @Input() block : Block
  @Input() user : User
  userLocal = {} as User;
  utilSvc = inject(UtilsService)
  constructor(private router: Router) {  
    
  }
  ngOnInit() {
    this.takeUser()
  }
  async takeUser(){
    this.userLocal = await this.utilSvc.getFromLocalStorage('user')
  }

  clickUser(id: string){
    console.log(this.userLocal.uid , id)
    if (this.userLocal.uid == id){
      this.router.navigate(['userprofile']);
    }else{
      this.router.navigate(['view-users/', id]);
    }
  }
  clickBlock(){
    this.utilSvc.presentModal(
      {
        component: ViewBlockComponent,
        componentProps: {
          cardData: this.block,
          isModal : true
        }
      }
    )
  }

}
