import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evens = [1, 3, 5];
  odds = [2, 4];
  onlyOdd = false;
  value = 10;
}
