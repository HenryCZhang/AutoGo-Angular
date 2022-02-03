import { Component } from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { CarService } from'../services/car-service.service';
import { Car } from '../interfaces/car';
import { UserService } from '../services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  current_user
  lessorForm;
  cars:Car[];

  constructor(private builder:FormBuilder, private carService:CarService,private userService:UserService,public toastController: ToastController, private alertController:AlertController,private router:Router) {
    //get the current user's info
    this.current_user = userService.get_current_user();

    //  this.lessorForm = builder.group({
    //   firstName:['',[Validators.required]],
    //   lastName:['',[Validators.required]],
    //   email:['',[Validators.required]],
    //   password:['',[Validators.required]],
    // })
  }

  //get all the cars under this lessor account
  ionViewWillEnter(){
    this.carService.get_car_byLessor(this.current_user.id).subscribe((result)=>{
      this.cars=result;
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

  async confirmDelete(car){
    const alert = await this.alertController.create({
      message: 'Are you sure that you want to delete this car?',
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'yes',
          handler: () => {
            this.carService.delete_car(car.id).subscribe((result)=>{
              console.log(result);
              this.showMessage("Car has been deleted");
            },(err)=>{
              console.log(err);
            });
          }
        },
      ]
    })
    await alert.present();
  }


}
