import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../reducers/app-store';
import { AppState } from '../../reducers/index';
import { getUnreadMessagesCount } from '../../reducers/threads.reducer';

@Component({
  selector: 'chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor( @Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    this.unreadMessagesCount = getUnreadMessagesCount(this.store.getState());
  }

  ngOnInit() {
  }

}
