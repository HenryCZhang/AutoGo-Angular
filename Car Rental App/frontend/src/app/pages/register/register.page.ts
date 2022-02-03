import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  registerForm;
  registerForm_contact;
  first_name;
  last_name;
  email;
   
  constructor(private service:UserService,private contactService:ContactService ,private formBuilder: FormBuilder,private router:Router) {
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      lessor_picture: ['', [Validators.required]]
    }); 

    //for contact table
    this.registerForm_contact = formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];
    this.registerForm.patchValue({
      lessor_picture: file
    });    
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  register(){
    let formData = this.registerForm.value;
    let f = new FormData();
    //Transfer of all formgroup data into the FormData object;
    for(let k in formData)
    {
      f.append(k, formData[k]);
    }
    this.service.register(f).subscribe((result) => {
      alert('Register successful!');
    }, (err) => {
      alert('Register failed! ');
      console.log(err);
    });

    this.addContact();
  }

  addContact(){
    //create a new contact in the contact table
    this.registerForm_contact.patchValue({
      first_name:this.first_name,
      last_name:this.last_name,
      email:this.email
    });  
    let contact_formData = this.registerForm_contact.value;
    this.contactService.add_contact(contact_formData).subscribe((result) => {
      alert('Created contact successful!');
      //nav to the login page
      this.router.navigate(['']);//app-routing.module
    }, (err) => {
      alert('Created contact failed! ');
      console.log(err);
    });
  }

  get  first_nameFormControl(){
    return this.registerForm.get('first_name');
  }

  get  last_nameFormControl(){
    return this.registerForm.get('last_name');
  }

  get  emailFormControl(){
    return this.registerForm.get('email');
  }

  get  passwordFormControl(){
    return this.registerForm.get('password');
  }

  get  confirm_passwordFormControl(){
    return this.registerForm.get('confirmPassword');
  }
}
