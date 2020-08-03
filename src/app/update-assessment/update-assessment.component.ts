import { Component, OnInit, ViewChild } from '@angular/core';
import { assessment } from '../model/assessment.model';
import { course } from '../model/course.model';
import { trainee } from '../model/trainee.model';
import { TraineeService } from '../trainee.service';
import { AssessmentService } from '../assessment.service';
import { Router } from '../../../node_modules/@angular/router';
import { MatPaginator } from '../../../node_modules/@angular/material/paginator';
import { MatTableDataSource } from '../../../node_modules/@angular/material/table';
import { MatSnackBar } from '../../../node_modules/@angular/material/snack-bar';

@Component({
  selector: 'app-update-assessment',
  templateUrl: './update-assessment.component.html',
  styleUrls: ['./update-assessment.component.css']
})
export class UpdateAssessmentComponent implements OnInit {

  data:assessment;
  coursedata:course;
  traineeData:Array<trainee>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  colProject: string[] = [
    "traineeId",
    "traineeName",
    "percentage1",
    "percentage2",
    "percentage3"
  ];

  colOther: string[]=["traineeId", "traineeName", "percentage1"];

  displayedColumns: string[];

  dataSource;

  constructor(private router:Router,private traineeService:TraineeService, 
              private assessmentService:AssessmentService,private snackBar:MatSnackBar) {
    this.data=JSON.parse(localStorage.getItem("assessmentDetails"));
    console.log(JSON.parse(localStorage.getItem("assessmentDetails")));
    this.coursedata=JSON.parse(localStorage.getItem("course"));
    console.log(JSON.parse(localStorage.getItem("course")));
    console.log(localStorage.getItem("traineeData"));
    this.traineeData=JSON.parse(localStorage.getItem("traineeData"));
    if(this.data.assessmentType=="Project")
    {
      this.displayedColumns=this.colProject;
    }
    else{
      this.displayedColumns=this.colOther;
    }
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<trainee>(this.traineeData);
      this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
    
  }

  onUpdate(formdata){
      console.log(formdata);
      console.log(this.data);
      console.log(this.traineeData);
      console.log(this.dataSource);
      this.assessmentService.updateAssessment(this.data);
      this.traineeData.forEach((entry)=>{
        this.traineeService.updateTrainee(entry);
      });
      this.snackBar.open("Assessment Updated",'',{duration: 1000,});
      setTimeout(()=>{this.router.navigate([`/assessment`]);},1000);
  }
}
