import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  private url="http://localhost:8080/Academic/getDetails/";
  constructor(private http:HttpClient) { }

  getalldata(id:String): Observable<Object>
  {
    let data=this.http.get(this.url+id);
    data.subscribe(val => localStorage.setItem("allAcademicData",JSON.stringify(val)));
    return data;
  }
}
