import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail } from './validators/email-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  form: FormGroup;
  form2: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['test@mail.com', [Validators.required, validateEmail]],
      street: ['', Validators.minLength(3)],
      city: ['', Validators.maxLength(10)],
      zip: ['', Validators.pattern('[A-Za-z]{5}')]
    });

    this.form2 = this.fb.group({
      email2: ['test@mail.com', [Validators.required, validateEmail]]
    });
  }
}
