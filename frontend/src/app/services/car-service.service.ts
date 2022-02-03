import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  get_car():Observable<Car[]>{
    return this.http.get<Car[]>("http://localhost:8000/car");
  }

  get_car_available(searchData:any = {}):Observable<Car[]>{
    const opts = { params: new HttpParams(searchData) };
    return this.http.get<Car[]>("http://localhost:8000/car_available", {params: searchData});
  }

  get_car_byLessor(lessor_id):Observable<Car[]>{
    return this.http.get<Car[]>("http://localhost:8000/car_lessor/"+lessor_id);
  }

  get_car_byOrder(car_id):Observable<Car[]>{
    return this.http.get<Car[]>("http://localhost:8000/car_order/"+car_id);
  }

  add_car(data){
    return this.http.post("http://localhost:8000/car",data);
  }

  delete_car(carID){
    return this.http.delete("http://localhost:8000/delete_car/"+carID);
  }

  update_rented(car_id,rented){
    return this.http.patch("http://localhost:8000/car/"+car_id,{rented});
  }
}
