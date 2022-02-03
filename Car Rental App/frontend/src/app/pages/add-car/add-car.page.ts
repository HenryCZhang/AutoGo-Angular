import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder,Validators  } from '@angular/forms';
import { CarService } from 'src/app/services/car-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  carForm;

  constructor(private carService:CarService ,public toastController: ToastController,private builder:FormBuilder,private userService:UserService){
    //for the formControlName in html
    this.carForm = builder.group({
     lessor_id:[`${userService.get_current_user().id}`],//get the current user's ID
     country:['',[Validators.required]],
     city:['',[Validators.required]],
     return_location:['',[Validators.required]],
     type:['',[Validators.required]],
     seats:['',[Validators.required]],
     make:['',[Validators.required]],
     model:['',[Validators.required]],
     model_year:['',[Validators.required]],
     start_date:['',[Validators.required]],
     end_date:['',[Validators.required]],
     car_picture:['',[Validators.required]],
   })
  }

  ngOnInit() {
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];
    this.carForm.patchValue({
      car_picture: file
    });    
  }

  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(){
    let formData = this.carForm.value;
    let f = new FormData();

     //Transfer of all formgroup data into the FormData object;
     for(let k in formData)
     {
       f.append(k, formData[k]);
     }

    this.carService.add_car(f).subscribe((result)=>{
      console.log(result);
      this.carForm.reset();//clear form data
      this.showMessage('Add car successful');
    },(err)=>{
      console.log(err);
      this.showMessage('Err! Add car unsuccessful');
    })
  }

  get  lessor_idFormControl(){
    return this.carForm.get('lessor_id');
  }

  get  countryFormControl(){
    return this.carForm.get('country');
  }

  get  cityFormControl(){
    return this.carForm.get('city');
  }

  get return_locationFormControl(){
    return this.carForm.get('return_location');
  }
 
  get  typeFormControl(){
    return this.carForm.get('type');
  }


  get  seatsFormControl(){
    return this.carForm.get('seats');
  }


  get  makeFormControl(){
    return this.carForm.get('make');
  }

  get  modelFormControl(){
    return this.carForm.get('model');
  }

  get  model_yearFormControl(){
    return this.carForm.get('model_year');
  }

  get  start_dateFormControl(){
    return this.carForm.get('start_date');
  }

  get  end_dateFormControl(){
    return this.carForm.get('end_date');
  }

  get  FormControl(){
    return this.carForm.get('');
  }
}
