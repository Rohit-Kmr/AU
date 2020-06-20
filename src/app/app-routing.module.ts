import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AssessmentComponent } from './assessment/assessment.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';
import { NewAssessmentComponent } from './new-assessment/new-assessment.component';
import { UpdateAssessmentComponent } from './update-assessment/update-assessment.component';
import { CourseComponent } from './course/course.component';
import { TrendComponent } from './trend/trend.component';


const routes: Routes = [
  {
    path:"assessment",
    component:AssessmentComponent,
    //canActivate:[AuthGuard]
  },
  {
    path:"viewAssessment",
    component:ViewAssessmentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"addAssessment",
    component:NewAssessmentComponent,
   // canActivate:[AuthGuard]
  },
  {
    path:"updateAssessment",
    component:UpdateAssessmentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"Trends",
    component:TrendComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"score",
    component:CourseComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"",
    redirectTo: "login",
    pathMatch:"full"
  },
  {
    path:"**",
    redirectTo: "login",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
