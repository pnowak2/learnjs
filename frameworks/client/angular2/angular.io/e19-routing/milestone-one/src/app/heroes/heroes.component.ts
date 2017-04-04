import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeroService, Hero } from './hero.service';

@Component({
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Promise<Hero[]>;

  constructor(
    private service: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }

}
