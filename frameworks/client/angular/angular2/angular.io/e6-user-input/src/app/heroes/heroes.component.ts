import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: string[];

  constructor() {
    this.heroes = ['a', 'b', 'c', 'd'];
  }

  addHero(name: string) {
    this.heroes.push(name);
  }

  ngOnInit() {
  }

}
