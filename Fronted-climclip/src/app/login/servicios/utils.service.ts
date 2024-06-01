import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCrtl = inject(LoadingController);
  ToastCtrl = inject(ToastController);
  rotuer = inject(Router)
  modalCtrl = inject(ModalController)
  
  

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
  }


 async takePicture (promptLabelHeader:string)  {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto:	'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  };

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
  async saveInLocalStorage(key: string, value: any) {
    if (this.isAndroid()) {
      return await this.storage?.set(key, JSON.stringify(value));
    } else {
      console.log("entre")
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
  }

  // Obtener de localstorage
  async getFromLocalStorage(key: string) {
    if (this.isAndroid()) {
      const ret = await this.storage?.get(key);
      return ret ? JSON.parse(ret) : null;
    } else {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }

  
isAndroid() {
  // Lógica para detectar si es un entorno Android
  return /Android/i.test(navigator.userAgent);
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

  



  // Retornar rango de escalada

    getNumberOfDificulty(value : string){
      let rangosVisual: string[] = [
        "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
        "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+" 
      ];

      
  
      return rangosVisual.find((x:string) => x === value) || -1
    }

    getDificultyOfNumber(value:number){
      
      let rangosVisual: string[] = [
        "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", 
        "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A"
      ];
      if (value >= rangosVisual.length || value < 0){
        return null
      }
      return rangosVisual[value]
    }
}
