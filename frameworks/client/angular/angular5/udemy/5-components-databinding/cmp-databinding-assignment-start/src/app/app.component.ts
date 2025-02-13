import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  odds: number[] = [];
  evens: number[] = [];

  onTick(nb: number) {
    if (nb % 2 === 0) {
      this.odds.push(nb);
    } else {
      this.evens.push(nb);
    }
  }
}
