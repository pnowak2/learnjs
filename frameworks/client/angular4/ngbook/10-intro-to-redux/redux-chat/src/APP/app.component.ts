// import { ChatExampleData } from './data/chat-example-data';
import { Component, Inject } from '@angular/core';

import * as Redux from 'redux';

import { AppStore } from './app.store';
import { AppState } from './reducers/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( @Inject(AppStore) private store: Redux.Store<AppState>) {
    // ChatExampleData(store);
  }
}
