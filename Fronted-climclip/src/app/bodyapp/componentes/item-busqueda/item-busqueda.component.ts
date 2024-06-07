import { Component, Input, OnInit, input } from '@angular/core';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';

@Component({
  selector: 'app-item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.scss'],
})
export class ItemBusquedaComponent  implements OnInit {
  @Input() block : Block | User
  @Input() user : User
  constructor() { }

  ngOnInit() {

  }

}
