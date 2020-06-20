import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../node_modules/rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocialUser, AuthService } from '../../node_modules/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn:BehaviorSubject<Boolean>;
  private log:Boolean;
  private url="http://localhost:8080/Users/getUser/";

  constructor(private http:HttpClient,private authservice:AuthService) { 
    this.loggedIn=new BehaviorSubject<Boolean>(false);
    //localStorage.setItem("loggedIn","not set");
    }

  getUser(user:SocialUser): Observable<Object>
  {
    let data=this.http.get(this.url+user.email);
    data.subscribe(val => localStorage.setItem("UserData",JSON.stringify(val)));
    return data;
  }

  getallUser(): Observable<Object>
  {
    let data=this.http.get(this.url);
    data.subscribe(val => localStorage.setItem("allUserData",JSON.stringify(val)));
    return data;
  }

  setLoggedIn(newValue){
    this.loggedIn.next(newValue);
    localStorage.setItem("loggedIn",String(newValue));
    if(newValue=="false")
    {
      this.authservice.signOut();
    }
  }
  isLoggedIn():Observable<Boolean>{
    this.loggedIn.next(localStorage.getItem("loggedIn")=="true"?true:false);
    return this.loggedIn;
  }
}
