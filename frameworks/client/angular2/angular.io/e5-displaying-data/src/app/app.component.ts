import { Hero } from './../../../e2-heroes-tutorial/src/app/model/hero';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  heroes: Hero[] = [
    {
      id: 1,
      name: 'A'
    },
    {
      id: 2,
      name: 'B'
    }, {
      id: 3,
      name: 'C'
    }, {
      id: 4,
      name: 'D'
    }
  ]
  myHero = this.heroes[0];
}
