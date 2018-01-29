import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = ['', 'Basic', 'Advanced', 'Pro'];
  data = {
    email: '',
    subscription: '',
    password: ''
  };
  selectedSubscription = 'Advanced';
  submitted = false;

  onSubmit(form: NgForm) {
    this.data.email = form.value.email;
    this.data.subscription = form.value.subscription;
    this.data.password = form.value.password;

    this.submitted = true;
    form.reset();
  }
}
