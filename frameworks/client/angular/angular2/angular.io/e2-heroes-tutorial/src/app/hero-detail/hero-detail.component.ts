import { HeroService } from './../service/hero.service';
import { Hero } from './../model/hero';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'hrs-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private HeroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params) => {
        return this.HeroService.getHero(+params['id'])
      })
      .subscribe((hero: Hero) => this.hero = hero);
  }

  save() {
    this.HeroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
