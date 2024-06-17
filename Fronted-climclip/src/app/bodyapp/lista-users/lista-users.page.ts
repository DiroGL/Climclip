import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/login/models/user.models';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.page.html',
  styleUrls: ['./lista-users.page.scss'],
})
export class ListaUsersPage implements OnInit {
  @Input() itemData = [{} as User]
  
  constructor() {
   }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

}
