import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from '../../../node_modules/angularx-social-login';
import { Router } from '@angular/router'
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorlog:boolean=false;

  constructor(private authService: AuthService,
              private router: Router,
              private loginService:LoginService,
              private ChangeDetect:ChangeDetectorRef) {
                this.errorlog=false;
                if(localStorage.getItem("loggedIn")=="true")
                {
                  this.router.navigate([`\home`]);
                }
               }

  ngOnInit(): void {

    if(localStorage.getItem("loggedIn")=="true")
    {
      this.router.navigate([`\home`]);
    }
    
    this.authService.authState.subscribe((user)=>{
      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser=> {

      this.loginService.getUser(socialUser).subscribe(resp => {
        if(resp!=null)
        {
          this.loginService.setLoggedIn(true);
          this.router.navigate([`/home`]);
          location.reload();
        }
      },(err)=>{
        alert("User Not Found!!!");
        this.loginService.setLoggedIn(false);
      });
      this.ChangeDetect.detectChanges();
    });
  }
}
