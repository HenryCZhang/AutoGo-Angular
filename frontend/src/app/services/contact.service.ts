import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  //register page: add contact
  add_contact(data){
    return this.http.post("http://localhost:8000/contact",data);
  }

  get_contact_byUser(user_email):Observable<Contact[]>{
    return this.http.get<Contact[]>("http://localhost:8000/contact_user/"+user_email);
  }

  update_lessor_email(contact_id,lessor_email){
    return this.http.patch("http://localhost:8000/contact/"+contact_id,{lessor_email});
  }

  update_contact_picture(contact_id,contact_picture){
    return this.http.patch("http://localhost:8000/contact_picture/"+contact_id,{contact_picture});
  }

  delete_contact(contact_id,lessor_email){
    return this.http.patch("http://localhost:8000/contact/"+contact_id,{lessor_email});//remove the lessor_email
  }
}
