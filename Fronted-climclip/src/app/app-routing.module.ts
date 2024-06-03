import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoLoginGuard } from './guards/no-login.guard';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) ,canActivate: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'home-login',
    pathMatch: 'full'
  },
  {
    path: 'home-login',
    loadChildren: () => import('./login/home-login/home-login.module').then( m => m.HomeLoginPageModule), canActivate:[NoLoginGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./login/registro/registro.module').then( m => m.RegistroPageModule), canActivate:[NoLoginGuard]
  },
  {
    path: 'tabfeed',
    loadChildren: () => import('./bodyapp/tabfeed/tabfeed.module').then( m => m.TabfeedPageModule) ,canActivate: [LoginGuard]
  },
  {
    path: 'searchpage',
    loadChildren: () => import('./bodyapp/searchpage/searchpage.module').then( m => m.SearchpagePageModule),canActivate: [LoginGuard]
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./bodyapp/userprofile/userprofile.module').then( m => m.UserprofilePageModule),canActivate: [LoginGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./login/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), canActivate:[NoLoginGuard]
  },
  {
    path: 'politicas-de-uso',
    loadChildren: () => import('./login/politicas-de-uso/politicas-de-uso.module').then( m => m.PoliticasDeUsoPageModule),canActivate: [LoginGuard]
  },
  {
    path: 'politicas-de-privacidad',
    loadChildren: () => import('./login/politicas-de-privacidad/politicas-de-privacidad.module').then( m => m.PoliticasDePrivacidadPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./bodyapp/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
