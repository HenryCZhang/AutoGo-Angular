import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import {MyContactPage} from '../pages/my-contact/my-contact.page'
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  current_user;
  user_img_src;
  loginActivated:boolean=false;

  constructor(private userService:UserService,private contactService:ContactService,public toastController: ToastController, private alertController:AlertController, private router:Router) {
    
  }

  ionViewWillEnter(){
    console.log('did enter');
    this.current_user = this.userService.get_current_user();
    this.user_img_src = 'http://localhost:8000/images/'+this.current_user.lessor_picture;//user_picture src
    console.log(this.user_img_src)//testing
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  async logout(){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to log out?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.userService.logout();
            this.showMessage("You are logged out");
            this.router.navigate(['/login']);//app-routing.module
          }
        },
      ]
    });
    await alert.present();
  }
}
