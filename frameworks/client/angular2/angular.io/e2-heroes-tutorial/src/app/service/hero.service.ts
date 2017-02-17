import { HEROES } from './../mock-heroes';
import { Hero } from './../model/hero';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(HEROES), 300);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id))
  }
}
