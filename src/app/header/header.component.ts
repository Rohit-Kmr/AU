import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../../../node_modules/angularx-social-login';
import { LoginService } from '../login.service';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  
  userType:String;

  loggedIn:Boolean;

  @ViewChild('sidenav') public snav:MatSidenav;

  constructor( private router:Router,
               private authService:AuthService,
               private loginService:LoginService,
               private changeDetect: ChangeDetectorRef) {
              this.loggedIn=false; 
               this.userType=JSON.parse(localStorage.getItem("UserData")).type;
               }
               
  toggle():void{
    this.changeDetect.detectChanges();
    this.snav.toggle();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
     this.loginService.isLoggedIn().subscribe((data) =>{
       this.loggedIn=data;
     });
    this.changeDetect.detectChanges();
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
  goToTrend(){
    this.router.navigate([`/Trends`]);
  }
  goToScore(){
    this.router.navigate([`/score`]);
  }

  goToAddAssessment(){
    
    this.changeDetect.detectChanges();
    this.router.navigate([`/addAssessment`]);
    
    this.changeDetect.detectChanges();
  }
}
