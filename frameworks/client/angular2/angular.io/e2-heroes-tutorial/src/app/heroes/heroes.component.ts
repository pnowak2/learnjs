import { HeroService } from './../service/hero.service';
import { Hero } from './../model/hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrs-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];


  constructor(private heroesService: HeroService) {

  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
