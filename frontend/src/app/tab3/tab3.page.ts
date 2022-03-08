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

  current_user;
  lessorForm;
  cars:Car[];
  countCars=0;
  hideAddCarBtn1=true;


  constructor(private builder:FormBuilder, private carService:CarService,private userService:UserService,public toastController: ToastController, private alertController:AlertController,private router:Router) {
    //get the current user's info
    this.current_user = userService.get_current_user();
  }

  //get all the cars under this lessor account
  ionViewWillEnter(){
    this.carService.get_car_byLessor(this.current_user.id).subscribe((result)=>{
      this.cars=result;
      if(this.cars[0]!==undefined){
        this.countCars=1;
        this.hideAddCarBtn1=false;
      }else{
        this.hideAddCarBtn1=true;
      }
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
               window.location.reload();
            },(err)=>{
              console.log(err);
            });
          }
        },
      ]
    })
    await alert.present();
  }

  //Add Car button onClick
  navToAddCar(){
    this.router.navigateByUrl('/add-car');
  }


}
