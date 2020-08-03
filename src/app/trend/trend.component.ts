import { Component, OnInit } from '@angular/core';
import { TrendService } from '../trend.service';
import { trend } from '../model/trend.model';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

  data=[];
  dataCourse=[];
  titleCourse="Course Trends";
  dataAssessment=[];
  titleAssessment="Assessment Trends";
  dataScore=[];
  titleScore="Score Trends";
  title="Trends";
  type="LineChart";
  type2="PieChart";
  columnNames=['Year','Total Courses','Total Assessments','Average Score'];
  columnNamesCourse=['Year','Total Courses'];
  columnNamesAssessment=['Year','Total Assessments'];
  columnNamesScore=['Year','Average Score'];
  constructor(private trendService:TrendService) {
   }

  ngOnInit(): void {
    this.trendService.getTrend().subscribe((trends)=>{
      let tempData=trends as trend[];
      console.log(tempData);
      tempData.forEach((inst)=>{
        this.data=[[inst.year,inst.totalCourses,inst.totalAssessments,inst.averageScore],...this.data];
        this.dataCourse=[[inst.year,inst.totalCourses],...this.dataCourse];
        this.dataAssessment=[[inst.year,inst.totalAssessments],...this.dataAssessment];
        this.dataScore=[[inst.year,inst.averageScore],...this.dataScore];
        console.log(this.data);
      });
    });

  }
}
