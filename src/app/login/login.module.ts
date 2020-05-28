import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login'

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('306414074516-41uhtu6dfac0g6tl4egv6p44t9vs5jk3.apps.googleusercontent.com')
  }
]);

export function provideConfig(){
  return config;
}

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  providers:[
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [
    LoginScreenComponent
  ]
})
export class LoginModule { }
