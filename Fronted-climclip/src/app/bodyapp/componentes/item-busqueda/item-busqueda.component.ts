import { Component, Input, input } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';

@Component({
  selector: 'app-item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.scss'],
})
export class ItemBusquedaComponent   {
  @Input() block : Block
  @Input() user : User
  constructor() { }

  

}
