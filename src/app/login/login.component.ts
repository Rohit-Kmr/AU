import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from '../../../node_modules/angularx-social-login';
import { Router } from '@angular/router'
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private user:SocialUser;
   errorlog:string;

  constructor(private authService: AuthService,
              private router: Router,
              private loginService:LoginService) {
                this.user=null;
                if(localStorage.getItem("loggedIn")=="true")
                {
                  this.router.navigate([`\home`]);
                }
                this.errorlog=localStorage.getItem("errormes");
                localStorage.removeItem("errormes");
               }

  ngOnInit(): void {

    if(localStorage.getItem("loggedIn")=="true")
    {
      this.router.navigate([`\home`]);
    }
    
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser=> {

      this.loginService.getUser(socialUser).subscribe(resp => {
        if(resp!=null)
        {
          this.user=socialUser;
          this.loginService.setLoggedIn(true);
          this.loginService.isLoggedIn().subscribe(data=>{
            if(data==true)
            {
            this.router.navigate([`/home`]);
            }
            else{
              if(localStorage.getItem("loggedIn")=="false")
              { this.errorlog="no user found";}
            }
          });
        }
        else{
          this.signOut();
        }
      });
    });
  }
  signOut(): void {
    this.authService.signOut();
    this.user=null;
    this.loginService.setLoggedIn(false);
  }
}
