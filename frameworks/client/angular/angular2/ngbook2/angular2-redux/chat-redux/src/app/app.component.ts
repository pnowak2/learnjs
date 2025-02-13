import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from './reducers/app-store';
import { AppState } from './reducers/index';
import ChatExampleData from './ChatExampleData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AppStore) private store: Store<AppState>) {
    ChatExampleData(store);
  }
}
