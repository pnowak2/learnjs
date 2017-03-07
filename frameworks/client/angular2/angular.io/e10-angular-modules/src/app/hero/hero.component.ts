import { Component } from '@angular/core';

import { HeroService } from './hero.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  userName = '';
  constructor(userService: UserService) {
    this.userName = userService.userName;
  }
}
