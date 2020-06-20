import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { AssessmentService } from '../assessment.service';
import { assessment } from '../model/assessment.model';
import { CourseService } from '../course.service';
import { course } from '../model/course.model';
import { ResourceLoader } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  courseData:Array<course>;
  assessmentdata:Array<assessment>;
  assessment_id:{id:string;text:string;};
  course_id:{id:string;text:string;};

  selectData:any[]=[{id:"x",text:"new"},{id:"y",text:"hello"}]
  selectCoursedata:any[]=[{id:"null",text:"search and select..."}];
  selectAssessmentData:any[]=[{id:"null",text:"select course id first..."}];

  userType:String;

  constructor(private ChangeDetect:ChangeDetectorRef,private router:Router,private assessmentService:AssessmentService,private courseService:CourseService) { 
    localStorage.removeItem("course");
    localStorage.removeItem("assessmentDetails");
    localStorage.removeItem("traineeData");
    this.userType=JSON.parse(localStorage.getItem("UserData")).type;
    console.log(this.userType);
  }

  ngOnInit(): void {
    this.courseService.getAllcourse().subscribe((data)=>{
      console.log(data as course[]);
      this.courseData=data as course[];
      this.courseData.forEach(val => {
        this.selectCoursedata=[...this.selectCoursedata,{id:val.courseId,text:val.courseId}];
      });
    });
    console.log(this.selectCoursedata);
    this.assessmentService.getAllAssessments().subscribe((data)=>{
      console.log(data as course[]);
      this.assessmentdata=data as assessment[];
    });
    console.log("second:",localStorage.getItem("loggedIn"));

    this.ChangeDetect.detectChanges();
    if(!localStorage.getItem("refresh"))
    {
      localStorage.setItem("refresh","true");
      location.reload();
    }
    else{
          localStorage.removeItem("refresh");
    }
  }

  onCourseidChange(event:any){
    
    console.log(event);
    this.selectAssessmentData=[{id:"null",text:"select course id first..."}];
    if(event.id=="null")
    {
      console.log("hello");
    }
    else{
      this.assessmentdata.forEach((val)=>{
        if(val.course_id==event.id)
        {
          this.selectAssessmentData=[...this.selectAssessmentData,{id:val.assessment_id,text:val.assessment_id}];
        }
      });
    }
    this.ChangeDetect.detectChanges();
  }

  onSubmit(formdata:NgForm){
    console.log(this.assessment_id);
    console.log(this.course_id);
    this.courseData.forEach((val)=>{
      if(this.course_id.id==val.courseId)
      {
        localStorage.setItem("course",JSON.stringify(val));
        console.log("hello",localStorage.getItem("course"));
      }
    });
    this.assessmentdata.forEach((val)=>{
      if(this.assessment_id.id==val.assessment_id)
      {
        localStorage.setItem("assessmentDetails",JSON.stringify(val));
        console.log(localStorage.getItem("assessmentDetails"));
      }
    });
    if(this.assessment_id.id!="null")
    {this.router.navigate([`/viewAssessment`]);}
  }

  goToTrend(){
    this.router.navigate([`/Trends`]);
  }
  goToScore(){
    this.router.navigate([`/score`]);
  }
}
