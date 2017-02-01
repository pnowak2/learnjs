import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'onchanges-app',
  templateUrl: './onchanges-app.component.html'
})
export class OnchangesAppComponent implements OnInit {
  name: string;
  comment: string;

  constructor() {
    this.name = 'Piotr Nowak';
    this.comment = 'Learning Angular';
  }

  setValues(namefld, commentfld): void {
    this.name = namefld.value;
    this.comment = commentfld.value;
  }

  ngOnInit() {
  }


}
