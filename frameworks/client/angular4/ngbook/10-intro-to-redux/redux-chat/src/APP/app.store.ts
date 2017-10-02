import { AppState } from './reducers/app.reducer';
import reducer from './reducers/app.reducer';

import { InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

export const AppStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<AppState> = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(reducer, compose(devtools));
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];
