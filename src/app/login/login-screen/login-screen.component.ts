import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from '../../../../node_modules/angularx-social-login';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {

  private router: Router;
  private user: SocialUser;
  loggedIn: Boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.loggedIn==true)
    {
      this.router.navigateByUrl("http://localhost:4200/home");
    }
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }
  putOnConsole(): void {
    console.log(this.user);
  }
}
