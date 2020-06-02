import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../node_modules/rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocialUser } from '../../node_modules/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn:BehaviorSubject<Boolean>;
  private url="http://localhost:8080/Users/getUser/";

  constructor(private http:HttpClient) { 
    this.loggedIn=new BehaviorSubject<Boolean>(false);
    }

  getUser(user:SocialUser): Observable<Object>
  {
    return this.http.get(this.url+user.email);
  }

  setLoggedIn(newValue){
    this.loggedIn.next(newValue);
  }
  isLoggedIn():Observable<Boolean>{
    return this.loggedIn.asObservable();
  }
}
