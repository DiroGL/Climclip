import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {


  // Arreglo que almacena el estado de "Me gusta" para cada post
  likes: boolean[] = [];

  // Arreglo que almacena el estado de "Añadir a favoritos" para cada post
  favorites: boolean[] = [];
  @Input() filtros : boolean = false

  constructor() {}
  ngOnInit() {
  }

  likePost(postId: number) {
    // Cambia el estado de "Me gusta" del post con el ID dado
    this.likes[postId] = !this.likes[postId];
    if (this.likes[postId]) {
      console.log('Has dado me gusta a la publicación con ID:', postId);
    } else {
      console.log('Has quitado me gusta a la publicación con ID:', postId);
    }
  }

  addToFavorites(postId: number) {
    // Cambia el estado de "Añadir a favoritos" del post con el ID dado
    this.favorites[postId] = !this.favorites[postId];
    if (this.favorites[postId]) {
      console.log('Has añadido a favoritos la publicación con ID:', postId);
    } else {
      console.log('Has quitado de favoritos la publicación con ID:', postId);
    }
  }

  commentOnPost(postId: number) {
    // Aquí podrías implementar la lógica para abrir la pantalla de comentarios del post con el ID dado
    console.log('Has comentado en la publicación con ID:', postId);
  }

}
