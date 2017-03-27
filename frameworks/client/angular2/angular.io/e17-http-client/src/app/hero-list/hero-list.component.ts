import { HeroService } from '../services/hero.service';
import { Hero } from '../model/hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  constructor(private heroService: HeroService) { }

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(
      heroes => this.heroes = heroes,
      error => this.errorMessage = <any>error);
  }

  addHero(name: string) {
    if (!name) { return; }
    
    this.heroService.create(name)
      .subscribe(
      hero => this.heroes.push(hero),
      error => this.errorMessage = <any>error);
  }
}
