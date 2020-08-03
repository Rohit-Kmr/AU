import { Component, OnInit, ViewChild } from "@angular/core";
import { course } from "../model/course.model";
import { assessment } from "../model/assessment.model";
import { TraineeService } from "../trainee.service";
import { trainee } from "../model/trainee.model";
import { AssessmentService } from "../assessment.service";
import { Router } from "../../../node_modules/@angular/router";
import { MatTableDataSource } from "../../../node_modules/@angular/material/table";
import { MatPaginator } from "../../../node_modules/@angular/material/paginator";
import { MatSnackBar } from '../../../node_modules/@angular/material/snack-bar';

@Component({
  selector: "app-view-assessment",
  templateUrl: "./view-assessment.component.html",
  styleUrls: ["./view-assessment.component.css"]
})
export class ViewAssessmentComponent implements OnInit {
  data: assessment;

  coursedata: course;

  assessment: Array<trainee>;

  userType: String;

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

  constructor(
    private router: Router,
    private traineeService: TraineeService,
    private assesstmentService: AssessmentService,
    private snackBar:MatSnackBar
  ) {
    this.data = JSON.parse(localStorage.getItem("assessmentDetails"));
    console.log(JSON.parse(localStorage.getItem("assessmentDetails")));
    this.coursedata = JSON.parse(localStorage.getItem("course"));
    console.log(JSON.parse(localStorage.getItem("course")));
    this.userType = JSON.parse(localStorage.getItem("UserData")).type;
    if(this.data.assessmentType=="Project")
    {
      this.displayedColumns=this.colProject;
    }
    else{
      this.displayedColumns=this.colOther;
    }
  }

  ngOnInit(): void {
    this.traineeService.getTrainee(this.data.assessmentId).subscribe(Tdata => {
      this.assessment = Tdata as trainee[];
      console.log(this.assessment);
      this.dataSource = new MatTableDataSource<trainee>(this.assessment);
      this.dataSource.paginator = this.paginator;
    });
  }

  onUpdate() {
    localStorage.setItem("traineeData", JSON.stringify(this.assessment));
    console.log(localStorage.getItem("traineeData"));
    this.router.navigate([`/updateAssessment`]);
  }

  onDelete() {
    localStorage.removeItem("assessmentDetails");
    localStorage.removeItem("course");
    localStorage.removeItem("traineeData");
    this.traineeService.deleteTrainee(this.data.assessmentId);
    this.assesstmentService.deleteAssessment(this.data.assessmentId);
    this.snackBar.open("Assessment Deleted",'',{duration: 1000,});
    setTimeout(()=>{this.router.navigate([`/assessment`]);},1000);
  }
}
