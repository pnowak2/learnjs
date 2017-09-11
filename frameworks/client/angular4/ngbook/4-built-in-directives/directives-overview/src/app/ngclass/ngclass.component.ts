import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngclass',
  templateUrl: './ngclass.component.html',
  styleUrls: ['./ngclass.component.css']
})
export class NgclassComponent implements OnInit {
  isBordered = false;
  classesObj = {
    bordered: this.isBordered
  };

  constructor() { }

  ngOnInit() {
  }

  onToggle(evt) {
    this.isBordered = !this.isBordered;
    this.classesObj = {
      bordered: this.isBordered
    };
  }
}
