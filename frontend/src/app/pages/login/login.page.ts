import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  loginForm;
  // public userLoggedIn = new EventEmitter;

  constructor(private service:UserService, private formBuilder: FormBuilder,private router:Router,public toastController: ToastController) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  //Toaster
  async showMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  login(){
    let formData = this.loginForm.value;
    this.service.login(formData).subscribe((result) => {
      localStorage.setItem('currentUser', JSON.stringify(result)); //Storing the data of the currently logged in user on the browser
      //navs to the homepage after login successfully
      this.router.navigate(['/tabs/tab1']);//app-routing.module
    }, (err) => {
      this.showMessage('Incorrect email/password');
      console.log(err);
    });
  }

  get  emailFormControl(){
    return this.loginForm.get('email');
  }

  get  passwordFormControl(){
    return this.loginForm.get('password');
  }


}
