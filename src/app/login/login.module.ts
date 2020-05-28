import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';



@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginScreenComponent
  ]
})
export class LoginModule { }
