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
  title="trends";
  type="LineChart";
  columnNames=['Year','total_courses','total_assessments','average_score'];
  constructor(private trendService:TrendService) {
   }

  ngOnInit(): void {
    this.trendService.getTrend().subscribe((trends)=>{
      let tempData=trends as trend[];
      tempData.forEach((inst)=>{
        this.data=[...this.data,[inst.year,inst.total_courses,inst.total_assessments,inst.avarage_score]];
      });
    });

  }
}
