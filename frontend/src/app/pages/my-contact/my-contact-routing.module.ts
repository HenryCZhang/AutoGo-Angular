import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyContactPage } from './my-contact.page';

const routes: Routes = [
  {
    path: '',
    component: MyContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyContactPageRoutingModule {}
