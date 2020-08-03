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

  error_course:boolean;
  error_assessment:boolean;

  courseData:Array<course>;
  assessmentdata:Array<assessment>;
  assessmentId:{id:string;text:string;};
  courseId:{id:string;text:string;};

  selectCoursedata:any[]=[{id:"null",text:"Search and Select.... "}];
  selectAssessmentData:any[]=[];


  constructor(private ChangeDetect:ChangeDetectorRef,private router:Router,private assessmentService:AssessmentService,private courseService:CourseService) { 
    localStorage.removeItem("course");
    localStorage.removeItem("assessmentDetails");
    localStorage.removeItem("traineeData");
    this.error_course=false;
    this.error_assessment=false;
  }

  ngOnInit(): void {
    this.courseService.getAllcourse().subscribe((data)=>{
      console.log(data as course[]);
      this.courseData=data as course[];
      this.courseData.forEach(val => {
        this.selectCoursedata=[...this.selectCoursedata,{id:val.courseId,text:val.courseName}];
      });
      this.ChangeDetect.detectChanges();
    });
    console.log(this.selectCoursedata);
    this.assessmentService.getAllAssessments().subscribe((data)=>{
      console.log(data as course[]);
      this.assessmentdata=data as assessment[];
      this.ChangeDetect.detectChanges();
    });
    console.log("second:",localStorage.getItem("loggedIn"));
  }

  onCourseidChange(event:any){
    
    console.log(event);
    this.selectAssessmentData=[{id:"null",text:"Search and Select.... "}];
    if(event.id=="null")
    {
      this.error_course=true;
      console.log("hello");
    }
    else{
      this.error_course=false;
      this.assessmentdata.forEach((val)=>{
        if(val.courseId==event.id)
        {
          this.selectAssessmentData=[...this.selectAssessmentData,{id:val.assessmentId,text:val.assessmentName}];
        }
      });
    }
    this.ChangeDetect.detectChanges();
  }

  onAssessmentIdChange(event:any){
    if(event.id=="null")
    {
      this.error_assessment=true;
    }
    else{
      this.error_assessment=false;
    }
    this.ChangeDetect.detectChanges();
  }

  onSubmit(formdata:NgForm){
    console.log(formdata.controls);
    console.log(formdata);
    console.log(this.assessmentId);
    console.log(this.courseId);
    let hasError=false;
    if(formdata.controls.course_id.valid==false || formdata.value.course_id.id=="null")
    {
      this.error_course=true;
      hasError=true;
    }
    if(formdata.controls.assessment_id.valid==false || formdata.value.assessment_id.id=="null")
    {
      this.error_assessment=true;
      hasError=true;
    }
    this.ChangeDetect.detectChanges();
    if(hasError==false)
    {
      this.courseData.forEach((val)=>{
        if(this.courseId.id==val.courseId)
        {
          localStorage.setItem("course",JSON.stringify(val));
          console.log("hello",localStorage.getItem("course"));
        }
      });
      this.assessmentdata.forEach((val)=>{
        if(this.assessmentId.id==val.assessmentId)
        {
          localStorage.setItem("assessmentDetails",JSON.stringify(val));
          console.log(localStorage.getItem("assessmentDetails"));
        }
      });
      if(this.assessmentId.id!="null")
      {this.router.navigate([`/viewAssessment`]);}
    }
  }
}
