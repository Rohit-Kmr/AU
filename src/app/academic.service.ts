import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { score } from './model/score.model';
import { assessment } from './model/assessment.model';
import { trainee } from './model/trainee.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  private url="http://localhost:8080/Academic/getDetails/";
  constructor(private http:HttpClient) { }

  getalldata(id:string): Observable<Object>
  {
    let data=this.http.get(this.url+id);
    data.subscribe(val => localStorage.setItem("allAcademicData",JSON.stringify(val)));
    return data;
  }
/*
  getAllAcademic(data){

    let academic = [];
    console.log(data);
    assessmentService.getAllAssessments().subscribe(data => {
      console.log(data as assessment[]);
      this.assessmentdata = data as assessment[];
    traineeService.getAllTrainees().subscribe(data => {
      console.log(data as trainee[]);
      this.traineeData = data as trainee[];
    this.getalldata(data.form.value.course_id)
      .subscribe(val => {
        academic = val as score[];
        for (let i = 0; i < academic.length; i++) {
          academic[i].score = 0;
        }
        console.log(academic.length);

        let weigthsum = 0;
        this.assessmentdata.forEach(val => {
          if (val.courseId == data.form.value.course_id) {
            weigthsum = weigthsum + val.weightage1;
            if (
              val.weightage2 != 0 &&
              val.weightage2 != null &&
              val.weightage2 != undefined
            ) {
              weigthsum = weigthsum + val.weightage2;
              weigthsum = weigthsum + val.weightage3;
            }
          }
        });

        this.assessmentdata.forEach(val => {
          if (val.courseId == data.form.value.course_id) {
            this.traineeData.forEach(element => {
              if (element.assessmentId == val.assessmentId) {
                let score = 0;
                score = score + element.percentage1 * val.weightage1 * 0.01;
                if (
                  val.weightage2 != 0 &&
                  val.weightage2 != null &&
                  val.weightage2 != undefined
                ) {
                  score = score + element.percentage2 * val.weightage2 * 0.01;
                  score = score + element.percentage3 * val.weightage3 * 0.01;
                }
                for (let i = 0; i < academic.length; i++) {
                  if (academic[i].candidateId == element.traineeId) {
                    academic[i].score = academic[i].score + score;
                  }
                }
              }
            });
          }
        });
        let tempArray = academic.sort(
          (n1: score, n2: score) => n2.score - n1.score
        );
        let i = 0;
        academic.forEach(val => {
          academic[i].score = Number(
            ((val.score / weigthsum) * 100).toFixed(2)
          );
          i++;
        });
        for (let i = 0; i < tempArray.length; i++) {
          tempArray[i].percentile = Number(
            (((tempArray.length - i - 1) / tempArray.length) * 100).toFixed(2)
          );
        }
        academic = tempArray;
        console.log("hello world", academic);
      });
    return academic;
  }*/
}
