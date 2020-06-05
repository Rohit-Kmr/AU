import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  
  private baseUrl="http://localhost:8080/Trainee/";

  constructor(private http:HttpClient) { }

  getAllTrainees(){
    let data=this.http.get(this.baseUrl+"getTrainee/");
    data.subscribe(val => localStorage.setItem("AllTraineeData",JSON.stringify(val)));
    return data;
  }

  getTrainee(id:String){
    let data=this.http.get(this.baseUrl+"getTrainee/"+id);
    data.subscribe(val => localStorage.setItem("TraineeServiceData",JSON.stringify(val)));
    return data;
  }

  addTrainee(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.post(this.baseUrl+"addTrainee/"+temp.userId,data).subscribe();
  }

  updateTrainee(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.put(this.baseUrl+"updateTrainee/"+temp.userId,data).subscribe();
  }

  deleteTrainee(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.delete(this.baseUrl+"deleteTrainee/"+data+"/"+temp.userId).subscribe();
  }
}
