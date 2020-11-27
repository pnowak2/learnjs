import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stockSymbol = 'IBM';
  hasFinder = false;

  onLoadFinder() {
    this.hasFinder = !this.hasFinder;
  }

  onSymbolSelected(evt: CustomEvent) {
    console.log('symbol selected', evt.detail);
  }
}
