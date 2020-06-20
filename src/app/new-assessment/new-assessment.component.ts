import { Component, OnInit } from '@angular/core';
import { assessment } from '../model/assessment.model';
import { course } from '../model/course.model';
import { trainee } from '../model/trainee.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { CourseService } from '../course.service';
import { LoginService } from '../login.service';
import { AssessmentService } from '../assessment.service';
import { TraineeService } from '../trainee.service';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.css']
})
export class NewAssessmentComponent implements OnInit {

  data:assessment;
  course:Array<course>;
  coursedata:course;
  assessment:Array<trainee>;
  assessmentType=[
    'QUIZ', 
    'MCQ', 
    'Project', 
    'Assignment', 
    'OTHER'
  ];
  text="hello";
  value_assessmentType:String;
  
  constructor(private router:Router,private courseService:CourseService, private loginService:LoginService,
              private assessmentService:AssessmentService,private traineeService:TraineeService) { 
    console.log(this.assessmentType);
    this.value_assessmentType=null;
    this.coursedata=new course();
    this.data=new assessment();
    this.assessment= [];
  }

  ngOnInit(): void {
    this.courseService.getAllcourse().subscribe((data)=>{
      console.log(data as course[]);
      this.course=data as course[];
    });
    this.loginService.getallUser().subscribe();
    console.log(localStorage.getItem("allUserData"));
    let index=0;
    JSON.parse(localStorage.getItem("allUserData")).forEach((val)=>{
      if(val.type=="candidate")
      {
        this.assessment.push(new trainee());
        this.assessment[index].trainee_name=val.name;
        this.assessment[index].trainee_id=val.userId;
        console.log(index);
        index++;
      }
    });
    console.log(this.assessment);
  }

  onAssessmentTypeChange(event:any){
    if(event.target.value!="null")
    {
      console.log(this.value_assessmentType);
      this.value_assessmentType=event.target.value;
      
    }
    console.log(this.value_assessmentType);

  }
  onCourseidChange(event:any){
    if(event.target.value!="null")
    {
      this.course.forEach((val)=>{
        if(event.target.value==val.courseId)
        {
          this.coursedata=val;
        }
      });
    }
  }
  onSubmit(){
      console.log(this.data);
      console.log(this.assessment);
      for (let i=0;i<this.assessment.length;i++)
      {
        this.assessment[i].assessment_id=this.data.assessment_id;
        console.log(this.assessment[i].percentage2)
        if(this.assessment[i].percentage2==undefined)
        {
          this.assessment[i].percentage2=0;
        }
        if(this.assessment[i].percentage3==undefined)
        {
          this.assessment[i].percentage3=0;
        }
      }
      console.log(this.assessment);
        if(this.data.weightage2==null)
        {
          this.data.weightage2=0;
        }
        if(this.data.weightage3==null)
        {
          this.data.weightage3=0;
        }
      this.assessmentService.addAssessment(this.data);
      this.assessment.forEach((entry)=>{
        this.traineeService.addTrainee(entry);
      });
      this.router.navigate([`/assessment`]);
  }
}
