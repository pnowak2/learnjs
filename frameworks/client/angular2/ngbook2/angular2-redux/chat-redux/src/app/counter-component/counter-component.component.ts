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

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    this.store.subscribe(this.readState);
  }

  ngOnInit() {
    
  }

  readState() {
    
  }

}
