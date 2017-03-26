import { Component, OnInit } from '@angular/core';

import { Hero, HeroService } from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero.component.html'
})
export class HeroListComponent implements OnInit {
  heroes: Promise<Hero[]>;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }
}
