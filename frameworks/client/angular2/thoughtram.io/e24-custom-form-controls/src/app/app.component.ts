import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { createCounterRangeValidator } from './counter-input/counter-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  outerCounterValue = 5;
  formReactive: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formReactive = this.fb.group({
      counter: [8, createCounterRangeValidator(0, 10)]
    });
  }
}
