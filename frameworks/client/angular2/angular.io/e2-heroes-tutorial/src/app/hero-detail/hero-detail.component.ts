import { Hero } from './../model/hero';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hrs-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
