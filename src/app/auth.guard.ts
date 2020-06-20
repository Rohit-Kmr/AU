import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(){
    //console.log("loggedIn: ",localStorage.getItem("loggedIn"));
      if(localStorage.getItem("loggedIn")=="true")
      {
        return true;
      }
      else{
        this.router.navigate([`/login`]);
        return false;
      }
  }
}
