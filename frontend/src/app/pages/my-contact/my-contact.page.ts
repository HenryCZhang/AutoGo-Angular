import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.page.html',
  styleUrls: ['./my-contact.page.scss'],
})
export class MyContactPage {

  contacts;
  current_user;

  ionViewWillEnter(){
    this.getContacts();
  }

  constructor(private router:Router, private userService:UserService, public contactService:ContactService, private toastController: ToastController, private alertController: AlertController) {
    this.current_user = userService.get_current_user();
   }

   async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  async confirmDelete(contact_id){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to delete this contact?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.contactService.delete_contact(contact_id,null).subscribe((result)=>{
              console.log(result);
            },(err)=>{
              console.log(err);
            });
            this.showMessage("Contact has been deleted");
            
          }
        },
      ]
    })
    await alert.present();
  }

  getContacts(){
    this.contactService.get_contact_byUser(this.current_user.email).subscribe((result)=>{
      this.contacts=result;
    },(err)=>{
      console.log(err);
    });
  }
  
}
