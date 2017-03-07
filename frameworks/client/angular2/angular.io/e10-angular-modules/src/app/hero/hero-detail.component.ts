import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Hero,
         HeroService }    from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'], 10);
    this.heroService.getHero(id).then(hero => this.hero = hero);
  }
}
