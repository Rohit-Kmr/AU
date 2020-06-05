import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  private url="http://localhost:8080/Trends/getAll";
  constructor(private http:HttpClient) { }

  getTrend(){
    return this.http.get(this.url);
  }
}
