import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title:String;
  name:String;
  constructor() { }

  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem("UserData"));
    console.log(localStorage.getItem("UserData"));
    this.title=data.type;
    this.name=data.name;
  }

}
