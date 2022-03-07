import { Component } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { CarService } from'../services/car-service.service';
import { Car } from '../interfaces/car';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cars:Car[];
  orderForm;
  searchForm;
  current_user;
  country;
  city;
  vehicle_type
  start_date;
  end_date;

  constructor(private menu: MenuController, private carService: CarService,public toastController: ToastController, private alertController:AlertController,private builder:FormBuilder,private userService:UserService,private orderService:OrderService, private router:Router) {
    //get current user
    this.current_user = userService.get_current_user();

    this.searchForm=builder.group({
      country:[''],
      city:[''],
      vehicle_type:[''],
      start_date:['',[Validators.required]],
      end_date:['',[Validators.required]],
    })

    this.orderForm = builder.group({
      car_id:[],///this.car.id
      client_firstname:[`${userService.get_current_user().first_name}`],
      client_lastname:[`${userService.get_current_user().last_name}`],
      client_email:[`${userService.get_current_user().email}`],
      client_picture:[`${userService.get_current_user().lessor_picture}`],
      start_date:['',[Validators.required]],//patch this.start_date
      end_date:['',[Validators.required]],//patch this.end_date
    })
  }

  //get all the cars in the DB where 'rented = false'
  ionViewWillEnter(){
    this.carService.get_car_available().subscribe((result)=>{
      this.cars=result;
    },(err)=>{
      console.log(err);
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  toggleCarDetails(car){
    car.toggled = !car.toggled;
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
            window.location.reload();
          }
        },
      ]
    });
    await alert.present();
  }

  //hide the contact-owner and place-order buttons if the user owns the car
  ownerRelation(car){
    if(car.lessor_id == this.current_user.id){
      return true;
    }
  }

  async contactOwner(car){
    console.log(`${car.Lessor.first_name} ${car.Lessor.last_name} \n ${car.Lessor.email} \n ${car.Lessor.lessor_picture} \n  ${car.Lessor.phone_number}`)
    const alert = await this.alertController.create({
      message: `<img src="http://localhost:8000/images/${car.Lessor.lessor_picture}" style="width:10px"> \n ${car.Lessor.first_name} ${car.Lessor.last_name} \n ${car.Lessor.email} \n ${car.Lessor.phone_number}`,
      cssClass: 'alertMessage',//not working
      buttons: [
        {
          text: 'ok'
        },
      ]
    });
    await alert.present();
  }

  async placeOrder(car){
    //dates guard condition
    if(this.start_date!=null && this.end_date!=null){

      let car_id=car.id;
      this.orderForm.patchValue({
        car_id: car_id,
        start_date:this.start_date,
        end_date:this.end_date
      });


      //need guard condition when dates are not entered
      car.rented = !car.rented;

      this.carService.update_rented(car.id,car.rented).subscribe((result)=>{
        console.log(result);
      },(err)=>{
        console.log(err);
      })
      this.router.navigate(['']);//auto refresh page to see changes - not working
      this.orderService.add_order(this.orderForm.value).subscribe((result)=>{
        console.log(result);
        this.showMessage('Order has been placed');
      },(err)=>{
        console.log(err);
        this.showMessage("Err! Order could not be placed");
      })
    }else{
      this.showMessage('Please enter the start date and end date');
    }
  }

  searchCar(){

    this.carService.get_car_available(this.searchForm.value).subscribe((result)=>{
      this.cars=result;
    },(err)=>{
      console.log(err);
    });

  }

  get  start_dateFormControl(){
    return this.orderForm.get('start_date');
  }

  get  end_dateFormControl(){
    return this.orderForm.get('end_date');
  }

}

