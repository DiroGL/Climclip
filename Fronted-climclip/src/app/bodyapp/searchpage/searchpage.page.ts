import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/interfaces/IPerfiles';
import { ImagenesService } from 'src/app/servicios/imagenes-service.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.page.html',
  styleUrls: ['./searchpage.page.scss'],
})
export class SearchpagePage implements OnInit {
  // Definir la propiedad como pública para que sea accesible desde el HTML
  public imagenes: any[]=[];
  searchQuery: string = '';
  perfiles: Perfil[]=[];
    constructor(private imagenesService: ImagenesService) {
      this.loadData();

     }
     loadData() {
      this.imagenesService.getPerfiles().subscribe(data => {
        this.perfiles = data.perfiles;
      });
    }
    buscar() {
      if (this.searchQuery.trim() !== '') {
        this.imagenesService.buscarPorUsuario(this.searchQuery).subscribe(perfilesEncontrados => {
          this.perfiles = perfilesEncontrados;
        });
      } else {
        this.loadData();
      }
    }
  ngOnInit(): void {
    this.imagenesService.obtenerImagenes().subscribe(data => {
      this.imagenes = data.imagenes;
    });
  }
}
