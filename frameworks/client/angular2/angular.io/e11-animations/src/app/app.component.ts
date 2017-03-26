import { Component } from '@angular/core';
import { Heroes } from './services/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Heroes]
})
export class AppComponent {
  constructor(private heroes: Heroes) { }
}
