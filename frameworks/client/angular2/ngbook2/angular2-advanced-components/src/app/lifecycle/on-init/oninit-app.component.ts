import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oninit-app',
  templateUrl: './oninit-app.component.html'
})
export class OninitAppComponent implements OnInit {
  display: boolean;

  constructor() {
    this.display = true;
   }

  ngOnInit() {
  }

  toggle() {
    this.display = !this.display;
  }

}
