import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'observable-app',
  template: `
    <observable-cmp [items]="itemObservable"></observable-cmp>
  `
})
export class ObservableApp {
  itemObservable: Observable<number> = Observable.timer(100, 100).take(101);
}