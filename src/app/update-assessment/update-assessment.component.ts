import { Component, OnInit } from '@angular/core';
import { assessment } from '../model/assessment.model';
import { course } from '../model/course.model';
import { trainee } from '../model/trainee.model';
import { TraineeService } from '../trainee.service';
import { AssessmentService } from '../assessment.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-update-assessment',
  templateUrl: './update-assessment.component.html',
  styleUrls: ['./update-assessment.component.css']
})
export class UpdateAssessmentComponent implements OnInit {

  data:assessment;
  coursedata:course;
  traineeData:Array<trainee>;

  constructor(private router:Router,private traineeService:TraineeService, private assessmentService:AssessmentService) {
    this.data=JSON.parse(localStorage.getItem("assessmentDetails"));
    console.log(JSON.parse(localStorage.getItem("assessmentDetails")));
    this.coursedata=JSON.parse(localStorage.getItem("course"));
    console.log(JSON.parse(localStorage.getItem("course")));
    console.log(localStorage.getItem("traineeData"));
    this.traineeData=JSON.parse(localStorage.getItem("traineeData"));
   }

  ngOnInit(): void {
    
  }
  onUpdateForm(){
      console.log(this.data);
      console.log(this.assessmentService.updateAssessment(this.data));
      this.traineeData.forEach((entry)=>{
        this.traineeService.updateTrainee(entry);
      });
      this.router.navigate([`/assessment`]);
  }
}
