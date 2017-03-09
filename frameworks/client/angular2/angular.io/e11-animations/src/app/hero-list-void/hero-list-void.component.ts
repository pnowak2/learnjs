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
  selector: 'hero-list-void',
  templateUrl: './hero-list-void.component.html',
  styleUrls: ['./hero-list-void.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.1)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({ transform: 'translateX(-100%) scale(1)' }),
        animate('0.2s ease-in')
      ]),
      transition('inactive => void', [
        animate(100, style({ transform: 'translateX(100%) scale(1)' }))
      ]),
      transition('void => active', [
        style({ transform: 'translateX(0) scale(0)' }),
        animate('0.2s ease-in')
      ]),
      transition('active => void', [
        animate('0.2s ease-out', style({ transform: 'translateX(0) scale(0)' }))
      ])
    ])
  ]
})
export class HeroListVoidComponent {
  @Input() heroes: Heroes;
}
