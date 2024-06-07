import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private imagenesUrl = 'assets/json/img.json';
  private perfiles = 'assets/json/perfiles.json';
  
  constructor(private http: HttpClient) { }

}