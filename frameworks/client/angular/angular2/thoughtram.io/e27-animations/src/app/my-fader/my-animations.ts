import { Component, Input, trigger, state, transition, style, animate } from '@angular/core';

export const animations = trigger('visibilityChanged', [
  state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
  state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
  transition('1 => 0', animate('300ms')),
  transition('0 => 1', animate('900ms'))
])