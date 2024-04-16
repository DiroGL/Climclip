import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navcrtl1 :NavController) {}
  ionViewDidEnter(){
  
    // this.navcrtl1.navigateRoot('/home-login')
    this.navcrtl1.navigateRoot('/userprofile')
  }
}
