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
 * Then define an animation for the inactive <=> active transition.
 * This animation has no end styles, but only styles that are
 * defined inline inside the transition and thus are only kept
 * as long as the animation is running.
 */
@Component({
  selector: 'hero-list-inline',
  templateUrl: './hero-list-inline.component.html',
  styleUrls: ['./hero-list-inline.component.css'],
  animations: [
    trigger('heroState', [
      transition('inactive <=> active', [
        style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.3)'
        }),
        animate('80ms ease-in', style({
          backgroundColor: '#eee',
          transform: 'scale(1)'
        }))
      ])
    ]),
  ]
})
export class HeroListInlineComponent {
  @Input() heroes: Heroes;
}
