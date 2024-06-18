import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/login/servicios/firebase.service';
import { UtilsService } from 'src/app/login/servicios/utils.service';
import { Block } from 'src/app/login/models/block.models'; // Asegúrate de ajustar la ruta según tu estructura
import { IonContent } from '@ionic/angular';
import { User } from 'src/app/login/models/user.models';

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
  userLocal: User;
  path = "blocks";
  cardData: Block[] = [];
  lastVisible: any = null;
  endReached: boolean = false;

  @ViewChild(IonContent) content: IonContent;
  constructor(private firebaseSvc: FirebaseService, private utilSvc: UtilsService) {
    this.userLocal = this.utilSvc.getLocalUser()
   
  }

   // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
   ngOnInit() {
    this.loading = false
    this.loadInitialDocuments();

  }
  cambiarParams(valor1: number, valor2: number) {
    this.cardData = [];
    this.valorfiltro1 = valor1;
    this.valorfiltro2 = valor2;
    this.loadInitialDocuments();
  }

  async loadInitialDocuments() {
    if (this.loading) return;
    this.loading = true;
    this.endReached = false;  // Reiniciar la bandera cuando se carga inicialmente
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


        let docs = [];
        if (this.endReached) {
            // Reiniciar paginación si se ha alcanzado el final

            docs = await this.firebaseSvc.getPaginatedDocuments(this.path, 5, null, currentUserUid).toPromise();
        } else {
            docs = await this.firebaseSvc.getPaginatedDocuments(this.path, 5, this.lastVisible, currentUserUid).toPromise();
        }

        if (docs.length > 0) {
            this.cardData = [...this.cardData, ...docs];
            this.lastVisible = docs[docs.length - 1];

            this.endReached = false; // Reset endReached if new documents are loaded
        } else {
            this.endReached = true; // Set endReached if no new documents are loaded
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
    this.cardData = [];
    this.lastVisible = null;
    this.loadInitialDocuments();
    if (event) {
      event.target.complete();
    }
  }
 
}
