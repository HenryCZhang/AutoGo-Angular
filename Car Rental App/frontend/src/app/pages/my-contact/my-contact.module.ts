import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyContactPageRoutingModule } from './my-contact-routing.module';

import { MyContactPage } from './my-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyContactPageRoutingModule
  ],
  declarations: [MyContactPage]
})
export class MyContactPageModule {}
