import { Block } from 'src/app/login/models/block.models';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';

@Component({
  selector: 'app-tabfeed',
  templateUrl: './tabfeed.page.html',
  styleUrls: ['./tabfeed.page.scss'],
})
export class TabfeedPage implements OnInit {
  filtros = true;
  valorfiltro1 = 0;
  valorfiltro2 = 15;
  loading = false;  // Bandera para evitar múltiples llamadas simultáneas

  constructor() {}

  async ngOnInit() {
    this.userLocal = await this.utilSvc.getFromLocalStorage('user');
    this.getRandomBlocks();
  }

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  
  userLocal;
  path = "blocks";
  cardData: Block[] = [];

  cambiarParams(valor1: number, valor2: number) {
    this.cardData = [];
    this.valorfiltro1 = valor1;
    this.valorfiltro2 = valor2;
  }

  async getRandomBlocks(event?: any) {
    if (this.loading) return; // Evita llamadas concurrentes
    this.loading = true;
    try {
      const blocks = await this.firebaseSvc.getRandomDocuments(this.path, 5, this.valorfiltro1, this.valorfiltro2, this.userLocal.uid).toPromise();
      this.cardData.push(...blocks);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    }
  }
}
