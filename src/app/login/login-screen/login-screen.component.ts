import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from '../../../../node_modules/angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {

  
  private user: SocialUser;
  private activeRoute: ActivatedRoute;
  loggedIn: Boolean;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser=> {
      console.log("hello",SocialUser);  
      this.router.navigate([`/home`]);
    });
  }
  signOut(): void {
    this.authService.signOut();
  }
  putOnConsole(): void {
    console.log(this.user);
  }
}
