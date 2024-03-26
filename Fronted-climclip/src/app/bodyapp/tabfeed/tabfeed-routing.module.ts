import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabfeedPage } from './tabfeed.page';

const routes: Routes = [
  {
    path: '',
    component: TabfeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabfeedPageRoutingModule {}
