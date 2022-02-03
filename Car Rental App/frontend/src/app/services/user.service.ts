import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleMonthNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(formData:object){
    return this.http.post('http://localhost:8000/login', formData);
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  register(formData:object){
    return this.http.post('http://localhost:8000/register', formData);
  }

  isAuthenticated(){
    return this.get_current_user() ? true: false;
  }

  get_current_user(){
    return JSON.parse(localStorage.getItem('currentUser'));//before: localStorage.getItem('currentUser')!
  }

  update_lessor_phone_number(lessor_id,formData:object){
    return this.http.patch("http://localhost:8000/lessor_phone_number/"+lessor_id,formData);
  }
  updatePhoneNumber(phone_number:any)
  {
    let user = this.get_current_user();
    user.phone_number = phone_number;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  update_lessor_first_name(lessor_id,formData:object){
    return this.http.patch("http://localhost:8000/lessor_first_name/"+lessor_id,formData);//todo backend
  }
  updateFirstName(first_name:any)
  {
    let user = this.get_current_user();
    user.first_name=first_name;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  update_lessor_last_name(lessor_id,formData:object){
    return this.http.patch("http://localhost:8000/lessor_last_name/"+lessor_id,formData);//todo backend
  }
  updateLastName(last_name:any)
  {
    let user = this.get_current_user();
    user.last_name=last_name;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  update_lessor_email(lessor_id,formData:object){
    return this.http.patch("http://localhost:8000/lessor_email/"+lessor_id,formData);//todo backend
  }
  updateEmail(email:any)
  {
    let user = this.get_current_user();
    user.email=email;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  update_lessor_picture(lessor_id,formData:object){
    return this.http.patch("http://localhost:8000/lessor_picture/"+lessor_id, formData);
  }
  updateProfilePicture(picture:any)
  {
    let user = this.get_current_user();
    user.lessor_picture = picture;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

}
