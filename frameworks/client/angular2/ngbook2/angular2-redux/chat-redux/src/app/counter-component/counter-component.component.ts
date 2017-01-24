import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../app-store';
import { AppState } from '../redux/counter/counter-app-state';
import * as CounterActions from '../redux/counter/counter-action-creators';

@Component({
  selector: 'counter-component',
  templateUrl: './counter-component.component.html',
  styleUrls: ['./counter-component.component.css']
})
export class CounterComponentComponent implements OnInit {
  counter: number;

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    this.store.subscribe(() => this.readState());
    this.readState();
  }

  ngOnInit() {
    
  }

  readState() {
    let state: AppState = this.store.getState() as AppState;
    this.counter = state.counter;
  }

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());   
  }

}
