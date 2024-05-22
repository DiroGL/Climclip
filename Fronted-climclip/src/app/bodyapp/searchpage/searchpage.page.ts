import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ImagenesService } from 'src/app/servicios/imagenes-service.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.page.html',
  styleUrls: ['./searchpage.page.scss'],
})
export class SearchpagePage {
  // Definir la propiedad como pública para que sea accesible desde el HTML
  public imagenes: any[]=[];
  searchQuery: string = '';

    constructor(private imagenesService: ImagenesService) {
    }

   
 
}
