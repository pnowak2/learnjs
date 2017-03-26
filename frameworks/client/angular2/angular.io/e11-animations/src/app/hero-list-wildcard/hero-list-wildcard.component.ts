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

/**
 * Define two states, "inactive" and "active", and the end
 * styles that apply whenever the element is in those states.
 * Then define animations for transitioning between the states,
 * one in each direction
 */
@Component({
  selector: 'hero-list-wildcard',
  templateUrl: './hero-list-wildcard.component.html',
  styleUrls: ['./hero-list-wildcard.component.css'],
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
      transition('* => active', animate('100ms ease-in')),
      transition('* => inactive', animate('100ms ease-out'))
    ]),
  ]
})
export class HeroListWildcardComponent {
  @Input() heroes: Heroes;
}
