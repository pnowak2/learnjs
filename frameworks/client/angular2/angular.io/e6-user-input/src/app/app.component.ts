import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  values='';
  values2='';
  values3='';

  onClickMe() {
    this.title = 'Clicked!';
  }

  onKey(evt: KeyboardEvent) {
    this.values += (evt.target as HTMLInputElement).value + ' | ';
  }

  onKey2(value: string) {
    this.values2 += value + ' | ';
  }

  onKeyEnter(value: string) {
    this.values3 += value + ' | ';
  }
}
