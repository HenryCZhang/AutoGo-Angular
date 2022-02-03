export interface Car {
    id:number;
    lessor_id:number;
    seats:number;
    type:string;
    make:string;
    model:string;
    country:string;
    city:string;
    model_year:number;
    start_date:Date;
    end_date:Date;
    status:string;
    toggled:boolean;
    return_location:string;
    car_picture:string;
    rented:boolean;
}
