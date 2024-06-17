import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { Block } from 'src/app/login/models/block.models'; // Asegúrate de ajustar la ruta según tu estructura
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tabfeed',
  templateUrl: './tabfeed.page.html',
  styleUrls: ['./tabfeed.page.scss'],
})
export class TabfeedPage implements OnInit {
  filtros = true;
  valorfiltro1 = 0;
  valorfiltro2 = 15;
  loading = false;
  userLocal: any;
  path = "blocks";
  cardData: Block[] = [];
  lastVisible: any = null;
  @ViewChild(IonContent) content: IonContent;
  constructor(private firebaseSvc: FirebaseService, private utilSvc: UtilsService) {
    this.userLocal = this.utilSvc.getLocalUser()
   
  }

   // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
   ngOnInit() {
    

  }
  cambiarParams(valor1: number, valor2: number) {
    this.cardData = [];
    this.valorfiltro1 = valor1;
    this.valorfiltro2 = valor2;
    this.loadInitialDocuments();
  }
  ionViewDidEnter(){
    this.loading = false
    this.loadInitialDocuments();
  }
  async loadInitialDocuments() { 
    if (this.loading) return;
    this.loading = true;
    try {
      const currentUserUid = this.userLocal.uid ? this.userLocal.uid : "";
      const docs = await this.firebaseSvc.getPaginatedDocuments(this.path, 5, null, currentUserUid).toPromise();
      this.cardData = docs;
      if (docs.length > 0) {
        this.lastVisible = docs[docs.length - 1];
      }
    } catch (error) {
      console.error('Error fetching initial documents:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadMoreDocuments(event) {
    if (this.loading) return;
    this.loading = true;
    try {
      const currentUserUid = this.userLocal.uid;
      const docs = await this.firebaseSvc.getPaginatedDocuments(this.path, 5, this.lastVisible, currentUserUid).toPromise();
      this.cardData = [...this.cardData, ...docs];
      if (docs.length > 0) {
        this.lastVisible = docs[docs.length - 1];
      }
      event.target.complete();
    } catch (error) {
      console.error('Error fetching more documents:', error);
      event.target.complete();
    } finally {
      this.loading = false;
    }
  }

  handleRefresh(event?) {
    console.log('handleRefresh called');
    this.cardData = [];
    this.lastVisible = null;
    this.loadInitialDocuments();
    if (event) {
      event.target.complete();
    }
  }
 
}
