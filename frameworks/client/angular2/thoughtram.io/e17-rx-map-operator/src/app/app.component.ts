import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = new FormControl();
  title = 'app works!';

  constructor() {
    this.text.valueChanges
      .map(value => ({ value: value, length: value.length }))
      .subscribe((value) => {
        console.log(value);
      })
  }
}
