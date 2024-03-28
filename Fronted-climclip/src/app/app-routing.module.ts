import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-login',
    loadChildren: () => import('./login/home-login/home-login.module').then( m => m.HomeLoginPageModule)
  },
  {
    path: 'home-login',
    loadChildren: () => import('./login/home-login/home-login.module').then( m => m.HomeLoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./login/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'tabfeed',
    loadChildren: () => import('./bodyapp/tabfeed/tabfeed.module').then( m => m.TabfeedPageModule)
  },
  {
    path: 'searchpage',
    loadChildren: () => import('./bodyapp/searchpage/searchpage.module').then( m => m.SearchpagePageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./bodyapp/userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
