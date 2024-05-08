import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCrtl = inject(LoadingController);
  ToastCtrl = inject(ToastController);
  rotuer = inject(Router)
  modalCtrl = inject(ModalController)


  // LOADING
  loading(){
    return this.loadingCrtl.create({ spinner: 'crescent'})
  }

  // Toast
  async presentToast(opts?: ToastOptions) {
    const toast = await this.ToastCtrl.create(opts);
    toast.present();
  }
  // Enrrutador
  routerlink(url: string){
    return this.rotuer.navigateByUrl(url)
  }

  // Local storage

  // Guardar
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // Obtener de localstorage
  getFromLocalStorage(key: string){
    return JSON.parse( localStorage.getItem(key))
  }


  //Modal 
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss()
    if (data) return data;
  }
  dismissModal(data? : any){
    return this.modalCtrl.dismiss(data)
  }

}
