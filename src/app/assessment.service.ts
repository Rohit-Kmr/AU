import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private baseUrl="http://localhost:8080/Assessment/";

  constructor(private http:HttpClient) { }

  getAllAssessments(){
    let data=this.http.get(this.baseUrl+"getAssessment/");
    data.subscribe(val => localStorage.setItem("AllAssessmentData",JSON.stringify(val)));
    return data;
  }

  getAssessment(id:String){
    let data=this.http.get(this.baseUrl+"getAssessment/"+id);
    data.subscribe(val => localStorage.setItem("AssessmentServiceData",JSON.stringify(val)));
    return data;
  }

  addAssessment(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.post(this.baseUrl+"addAssessment/"+temp.userId,data).subscribe();
  }

  updateAssessment(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.put(this.baseUrl+"updateAssessment/"+temp.userId,data).subscribe();
  }

  deleteAssessment(data){
    let temp=JSON.parse(localStorage.getItem("UserData"));
    return this.http.delete(this.baseUrl+"deleteAssessment/"+data+"/"+temp.userId).subscribe();
  }
}
