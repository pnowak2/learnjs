import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // need to put read, in other case it will be ElementRef
  // can omit this read by using in html <form #f="ngForm" ...>
  // @ViewChild('f', { read: NgForm }) signupForm;
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'teacher';
  answer = '';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
  }
}
