import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab4Page } from './tab4.page';
import { AuthguardService } from '../services/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
    canActivate : [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab4PageRoutingModule {}
