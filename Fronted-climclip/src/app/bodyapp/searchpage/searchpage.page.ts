import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Block } from 'src/app/login/models/block.models';
import { User } from 'src/app/login/models/user.models';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';

import { ImagenesService } from 'src/app/servicios/imagenes-service.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.page.html',
  styleUrls: ['./searchpage.page.scss'],
})
export class SearchpagePage {
  // Definir la propiedad como pública para que sea accesible desde el HTML
  searchQuery: string = '';
  itemData: any[];
  type = 'user'

  firebaseSvc = inject(FirebaseService)
  constructor(private imagenesService: ImagenesService) {

    this.search()
  }
  ionViewDidEnter() {
    this.searchQuery= ""
    this.search()
  }
  chageSearch(tipo:string){
    this.type = tipo
    this.search()
  }
  search(){
    if (this.type == "user"){
      this.firebaseSvc.buscarDocumentos("users", "username", this.searchQuery).subscribe((item :User[])=>{
        this.itemData = item
      })
    }else{
      this.firebaseSvc.buscarDocumentos("blocks", "nombre", this.searchQuery).subscribe((item :Block[])=>{
        this.itemData = item
      })
    }
  }
}
