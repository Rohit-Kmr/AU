import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url="http://localhost:8080/Courses/getCourses/";
  constructor(private http:HttpClient) { }

  getAllcourse(){
    let data=this.http.get(this.url);
    data.subscribe(val => localStorage.setItem("AllCourseData",JSON.stringify(val)));
    return data;
  }
  getCourse(id:String){
    let data=this.http.get(this.url+id);
    data.subscribe(val => localStorage.setItem("CourseServiceData",JSON.stringify(val)));
    return data;
  }
}
