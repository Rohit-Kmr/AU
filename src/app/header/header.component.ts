import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../../../node_modules/angularx-social-login';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loggedIn:Boolean;

  constructor( private router:Router,
               private authService:AuthService,
               private loginService:LoginService) { 
              //this.loggedIn=false;
               }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
     this.loginService.isLoggedIn().subscribe((data) =>{
       this.loggedIn=data;
     });
    });
  }

  onlogOut(): void {
    this.loginService.setLoggedIn("false");
    this.router.navigate([`/login`]);
  }
  goToHome(): void{
    this.router.navigate([`/home`]);
  }
  goToAssessment(): void{
    this.router.navigate([`/assessment`]);
  }
}
