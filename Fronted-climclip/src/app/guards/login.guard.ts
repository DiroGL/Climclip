import { FirebaseService } from './../login/servicios/firebase.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../login/servicios/utils.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = this.utilSvc.getFromLocalStorage('user')

    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth){
          if(user) resolve(true)
        }else{
          this.utilSvc.routerlink('/home-login')
          resolve(false)
        }
      })



    });
  }
  
}
