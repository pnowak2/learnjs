import { Component } from '@angular/core';
import { Hero } from './models/hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  myHero = new Hero(42, 'SkyDog', 'Fetch', 'Leslie');
  
  constructor() {
    console.log(this.myHero);
  }
}
