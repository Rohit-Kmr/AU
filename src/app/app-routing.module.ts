import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';


const routes: Routes = [
  {
    path:"login",
    component:LoginScreenComponent
  },
  {
    path:"home",
    component:HomeScreenComponent
  },
  {
    path:"",
    redirectTo: "login",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
