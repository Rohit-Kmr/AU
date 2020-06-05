import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from '../../node_modules/angularx-social-login';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '../../node_modules/@angular/common/Http';
import { AssessmentComponent } from './assessment/assessment.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAssessmentComponent } from './new-assessment/new-assessment.component';
import { UpdateAssessmentComponent } from './update-assessment/update-assessment.component';
import { TrendComponent } from './trend/trend.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { LSelect2Module } from 'ngx-select2';

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
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AssessmentComponent,
    ViewAssessmentComponent,
    CourseComponent,
    NewAssessmentComponent,
    UpdateAssessmentComponent,
    TrendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    LSelect2Module
  ],
  providers: [
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
