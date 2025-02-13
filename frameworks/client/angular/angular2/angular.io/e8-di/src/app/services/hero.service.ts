import { Injectable, Optional, Inject } from '@angular/core';
import { Logger } from './logger.service';
import { HEROES }     from './mock-heroes';

@Injectable()
export class HeroService {
  constructor(private logger: Logger,
  @Optional() @Inject('does not exist') private bummer: string) { }

  getHeroes() {
    this.logger.log('Getting heroes..');
    return HEROES;
  }
}
