import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Heroes } from '../services/hero.service';

@Component({
  selector: 'hero-list-basic',
  templateUrl: './hero-list-basic.component.html',
  styleUrls: ['./hero-list-basic.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ]
})
export class HeroListBasicComponent {
  @Input() heroes: Heroes;
}
