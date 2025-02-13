import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngif',
  templateUrl: './ngif.component.html',
  styleUrls: ['./ngif.component.css']
})
export class NgifComponent implements OnInit {
  a = 5;
  b = 3;
  str = 'yes';

  constructor() { }

  ngOnInit() {
  }

  myFunc() {
    return true;
  }

}
