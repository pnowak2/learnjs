import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
  activeToInactiveCtr = 0;
  inactiveToActiveCtr = 0;

  incrementActiveToInactive() {
    this.activeToInactiveCtr++;
    console.log(this.activeToInactiveCtr);
  }

    incrementInactiveToActive() {
    this.inactiveToActiveCtr++;
    console.log(this.inactiveToActiveCtr);
  }
}
