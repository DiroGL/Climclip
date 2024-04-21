import { FirebaseService } from './../login/servicios/firebase.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../login/servicios/utils.service';


@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
   firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let user = localStorage.getItem('user')
  

    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        console.log(auth)
        if (!auth)
         resolve(true)  
        else{
          this.utilSvc.routerlink('/tabfeed')
          resolve(false)
        }
      })



    });
  }
  
}
