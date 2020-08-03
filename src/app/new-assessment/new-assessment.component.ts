import { Component, OnInit, ViewChild } from '@angular/core';
import { assessment } from '../model/assessment.model';
import { course } from '../model/course.model';
import { trainee } from '../model/trainee.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { CourseService } from '../course.service';
import { LoginService } from '../login.service';
import { AssessmentService } from '../assessment.service';
import { TraineeService } from '../trainee.service';
import { MatPaginator } from '../../../node_modules/@angular/material/paginator';
import { MatTableDataSource } from '../../../node_modules/@angular/material/table';
import { MatSnackBar } from '../../../node_modules/@angular/material/snack-bar';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.css']
})
export class NewAssessmentComponent implements OnInit {

  data:assessment;
  courses:Array<course>;
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  colProject: string[] = [
    "traineeId",
    "traineeName",
    "percentage1",
    "percentage2",
    "percentage3"
  ];

  colOther: string[]=["traineeId", "traineeName", "percentage1"];

  displayedColumns: string[]=["traineeId", "traineeName", "percentage1"];

  dataSource;

  valueAssessmentType:string;
  
  constructor(private router:Router,private courseService:CourseService, private loginService:LoginService,
              private assessmentService:AssessmentService,private traineeService:TraineeService,
              private snackBar:MatSnackBar) { 
    console.log(this.assessmentType);
    this.valueAssessmentType=null;
    this.coursedata=new course();
    this.data=new assessment();
    this.assessment= [];
  }

  ngOnInit(): void {
    this.courseService.getAllcourse().subscribe((data)=>{
      console.log(data as course[]);
      this.courses=data as course[];
    });
    this.loginService.getallUser().subscribe();
    console.log(localStorage.getItem("allUserData"));
    let index=0;
    JSON.parse(localStorage.getItem("allUserData")).forEach((val)=>{
      if(val.type=="candidate")
      {
        this.assessment.push(new trainee());
        this.assessment[index].traineeName=val.name;
        this.assessment[index].traineeId=val.userId;
        console.log(index);
        index++;
      }
    });
    this.dataSource = new MatTableDataSource<trainee>(this.assessment);
    this.dataSource.paginator = this.paginator;
    console.log(this.assessment);
  }

  onAssessmentTypeChange(event:any){
    if(event!="null")
    {
      console.log(this.valueAssessmentType);
      this.valueAssessmentType=event;
      
    }
    if(this.valueAssessmentType=="Project")
    {
      this.displayedColumns=this.colProject;
    }
    else{
      this.displayedColumns=this.colOther;
    }
    console.log(this.valueAssessmentType);

  }
  onCourseidChange(event:any){
    if(event!="null")
    {
      this.courses.forEach((val)=>{
        if(event==val.courseId)
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
        this.assessment[i].assessmentId=this.data.assessmentId;
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
      this.snackBar.open("Assessment Created",'',{duration: 1000,});
      setTimeout(()=>{this.router.navigate([`/assessment`]);},1000);
  }
}
