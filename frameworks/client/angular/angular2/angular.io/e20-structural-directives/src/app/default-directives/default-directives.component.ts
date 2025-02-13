import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero';

@Component({
  selector: 'default-directives',
  templateUrl: './default-directives.component.html',
  styleUrls: ['./default-directives.component.css']
})
export class DefaultDirectivesComponent implements OnInit {
  hero: Hero;
  heroes: Hero[];

  constructor() {
    this.hero = new Hero();
    this.hero.name = 'SuperAngular';
    this.hero.emotion = 'happy';

    this.heroes = [this.hero];
  }
  ngOnInit() {
  }

}
