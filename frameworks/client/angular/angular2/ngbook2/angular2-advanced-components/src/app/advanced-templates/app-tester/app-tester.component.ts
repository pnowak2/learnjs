import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './app-tester.component.html',
  styleUrls: ['./app-tester.component.css']
})
export class AppTesterComponent implements OnInit {
  people: any[];

  constructor() {
    this.people = [
      {name: 'Joe', age: 10},
      {name: 'Patrick', age: 21},
      {name: 'Melissa', age: 12},
      {name: 'Kate', age: 19}
    ]
  }

  ngOnInit() {
  }

}
