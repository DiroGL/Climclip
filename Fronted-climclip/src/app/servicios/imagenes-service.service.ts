import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Perfil, PerfilesJSON } from '../interfaces/IPerfiles';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private imagenesUrl = 'assets/json/img.json';
  private perfiles = 'assets/json/perfiles.json';
  
  constructor(private http: HttpClient) { }

  obtenerImagenes(): Observable<any> {
    return this.http.get<any>(this.imagenesUrl);
  }
  getPerfiles(): Observable<PerfilesJSON> {
    return this.http.get<PerfilesJSON>(this.perfiles);
  }

  buscarPorUsuario(usuario: string): Observable<Perfil[]> {
    return this.getPerfiles().pipe(
      map(data => data.perfiles.filter(perfil => perfil.usuario.toLowerCase().includes(usuario.toLowerCase())))
    );
  }
  
}