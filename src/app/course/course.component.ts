import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { course } from '../model/course.model';
import { CourseService } from '../course.service';
import { AssessmentService } from '../assessment.service';
import { assessment } from '../model/assessment.model';
import { AcademicService } from '../academic.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { TraineeService } from '../trainee.service';
import { trainee } from '../model/trainee.model';
import { score } from '../model/score.model';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses:Array<course>;
  coursedata:course;
  traineeData:Array<trainee>;

  assessmentdata:Array<assessment>;

  academic:score[];

  constructor(private courseService:CourseService,
               private assessmentService:AssessmentService,
               private academicService:AcademicService,
              private traineeService:TraineeService,
              private changeDetect:ChangeDetectorRef) { 
    this.coursedata=new course();
    this.academic=[];
  }

  ngOnInit(): void {
    this.courseService.getAllcourse().subscribe((data)=>{
      console.log(data as course[]);
      this.courses=data as course[];
    });
    this.assessmentService.getAllAssessments().subscribe((data)=>{
      console.log(data as assessment[]);
      this.assessmentdata=data as assessment[];
    });
    this.traineeService.getAllTrainees().subscribe((data)=>{
      console.log(data as trainee[]);
      this.traineeData=data as trainee[];
    })
  }

  onCourseidChange(event:any){
    if(event.target.value!="null")
    {
      this.courses.forEach((val)=>{
        if(event.target.value==val.courseId)
        {
          this.coursedata=val;
        }
      });
    }
  }

  onSubmit(data:NgForm){
      this.academic=[];
      //console.log(this.academic)
      this.academicService.getalldata(data.form.value.course_id).subscribe((val)=>{
        this.academic=val as score[];
        //console.log(this.academic)
        for(let i=0;i<this.academic.length;i++)
        {
          this.academic[i].score=0;
        }
        console.log(this.academic.length);
       // console.log("hello",val);
      
      let weigthsum=0;
      this.assessmentdata.forEach((val)=>{
      if(val.course_id==data.form.value.course_id)
        {
          weigthsum=weigthsum+val.weightage1;
          if(val.weightage2!=0&&val.weightage2!=null&&val.weightage2!=undefined)
          {
            weigthsum=weigthsum+val.weightage2;
            weigthsum=weigthsum+val.weightage3;
          }
        }
      });
      
      this.assessmentdata.forEach((val)=>{
        if(val.course_id==data.form.value.course_id)
        {
          this.traineeData.forEach((element)=>{
            if(element.assessment_id==val.assessment_id)
            {
              let score=0;
              score=score+element.percentage1*val.weightage1*0.01;
              console.log(element.percentage1,element.percentage2,element.percentage3);
              if(val.weightage2!=0&&val.weightage2!=null&&val.weightage2!=undefined)
              {
                score=score+element.percentage2*val.weightage2*0.01;
                score=score+element.percentage3*val.weightage3*0.01;
              }
            for(let i=0;i<this.academic.length;i++)
            {
              if(this.academic[i].candidate_id==element.trainee_id)
              {
                this.academic[i].score=this.academic[i].score+score;
                //console.log(this.academic);
              }
            }
          }
          });
        }
      });
    //console.log("hello",this.academic);
    let tempArray=this.academic.sort((n1:score,n2:score)=>n2.score-n1.score);
    //console.log(tempArray);
    //console.log("hello",this.academic);
    let i=0;
    this.academic.forEach(val=>{
     // console.log(val.score);
     // console.log(weigthsum);
    this.academic[i].score=(val.score/weigthsum)*100;
     // console.log(this.academic);
      i++;
    });
    for(let i=0;i<tempArray.length;i++)
    {
      tempArray[i].percentile=((tempArray.length-i-1)/tempArray.length)*100;
    }
    this.academic=tempArray;     
    console.log("very somethin",this.academic);

    this.changeDetect.detectChanges();
  });
  }
}
