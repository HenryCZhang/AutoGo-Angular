import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { CarService } from '../services/car-service.service';
import { ContactService } from '../services/contact.service';
import { OrderService } from '../services/order-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public get alertController(): AlertController {
    return this._alertController;
  }
  public set alertController(value: AlertController) {
    this._alertController = value;
  }

  current_user;
  car;
  orders; 
  owner_img_src;
  contactForm;

  constructor(private formBuilder: FormBuilder,private _alertController: AlertController,private toastController: ToastController,private userService:UserService, private carService:CarService, private orderService:OrderService,private contactService:ContactService) {
    this.current_user = userService.get_current_user();

     //*for contact table
    //  this.contactForm = formBuilder.group({
    //   first_name: ['', [Validators.required]],
    //   last_name: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   contact_picture:['', [Validators.required]],
    // });
   }
 
  async confirmDelete(){
    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure that you want to remove this contact?',
      buttons: ['cancel', 'yes']
    });
    await alert.present();
  }

  //get all the orders under the current user account
  ionViewWillEnter(){
    this.orderService.get_order_byUser(this.current_user.email).subscribe((result)=>{
      this.orders=result;
    },(err)=>{
      console.log(err);
    });
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  async deleteOrder(order_id,order_car){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to delete this order?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.orderService.delete_order(order_id).subscribe((result)=>{
              console.log(result);
              this.showMessage("Order has been deleted");
            },(err)=>{
              console.log(err);
              this.showMessage("Err! Order could not be deleted");
            });

            //update car rented status
            order_car.rented = !order_car.rented;
            this.carService.update_rented(order_car.id,order_car.rented).subscribe((result)=>{
              console.log(result);
            },(err)=>{
              console.log(err);
            })
          }
        },
      ]
    })
    await alert.present();
  }

  keepContact(contact){
    //update contact_picture
    let contact_picture=contact.lessor_picture;
    this.contactService.update_contact_picture(contact.id,contact_picture).subscribe((result)=>{
      console.log(result);
      this.showMessage('updated contact_picture  successful');
    },(err)=>{
      console.log(err);
      this.showMessage("Err! contact_picture update failed");
    });

    //update contact lessor_email
    let current_user_email = this.current_user.email;
    this.contactService.update_lessor_email(contact.id,current_user_email).subscribe((result)=>{
      console.log(result);
      this.showMessage('Added contact successful');
    },(err)=>{
      console.log(err);
      this.showMessage("Err! Failed to add contact");
    });
  }

}
