import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css']
})
export class ExcerciseComponent implements OnInit {
  username = '';

  constructor() { }

  ngOnInit() {
  }

  isButtonDisabled() {
    return !this.username;
  }

  reset() {
    this.username = '';
  }
}
