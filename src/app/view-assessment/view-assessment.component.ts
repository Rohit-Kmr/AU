import { Component, OnInit } from '@angular/core';
import { course } from '../model/course.model';
import { assessment } from '../model/assessment.model';
import { TraineeService } from '../trainee.service';
import { trainee } from '../model/trainee.model';
import { AssessmentService } from '../assessment.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.css']
})
export class ViewAssessmentComponent implements OnInit {

  data:assessment;

  coursedata:course;

  assessment:Array<trainee>;

  userType:String;

  constructor(private router:Router,private traineeService:TraineeService,private assesstmentService:AssessmentService) { 
    this.data=JSON.parse(localStorage.getItem("assessmentDetails"));
    console.log(JSON.parse(localStorage.getItem("assessmentDetails")));
    this.coursedata=JSON.parse(localStorage.getItem("course"));
    console.log(JSON.parse(localStorage.getItem("course")));
    this.userType=JSON.parse(localStorage.getItem("UserData")).type;
  }

  ngOnInit(): void {
    this.traineeService.getTrainee(this.data.assessment_id).subscribe((Tdata)=>{
      this.assessment=Tdata as trainee[];
    });
  }

  onUpdate(){
    localStorage.setItem("traineeData",JSON.stringify(this.assessment));
    console.log(localStorage.getItem("traineeData"));
    this.router.navigate([`/updateAssessment`]);
  }

  onDelete(){
    localStorage.removeItem("assessmentDetails");
    localStorage.removeItem("course");
    localStorage.removeItem("traineeData");
    this.traineeService.deleteTrainee(this.data.assessment_id);
    this.assesstmentService.deleteAssessment(this.data.assessment_id);
    this.router.navigate([`/assessment`]);
  }
}
