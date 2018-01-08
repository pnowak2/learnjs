import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
  styles: [`
    h1 {
      color: darkred;
    }
  `]
})
export class AppComponent {
  title = 'app';
}
