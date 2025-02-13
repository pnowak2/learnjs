import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeroService, Hero } from './hero.service';

@Component({
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Promise<Hero[]>;
  selectedId: number;

  constructor(
    private service: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
    this.selectedId = this.route.snapshot.params['id'];
    
  }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }

  isSelected(hero: Hero) {
    return hero.id == this.selectedId;
  }

}
