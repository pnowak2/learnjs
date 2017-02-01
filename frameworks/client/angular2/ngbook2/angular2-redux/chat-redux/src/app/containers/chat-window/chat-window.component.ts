import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Store } from 'redux';
import { Thread } from '../../models/thread';
import { User } from '../../models/user';
import { AppStore } from '../../reducers/app-store';
import { AppState } from '../../reducers/index';
import * as ThreadActions  from '../../actions/thread.actions';
import { getCurrentThread } from '../../reducers/threads.reducer';
import { getCurrentUser } from '../../reducers/users.reducer';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  currentThread: Thread;
  draftMessage: { text: string };
  currentUser: User;

  constructor( @Inject(AppStore) private store: Store<AppState>,
    private el: ElementRef) {
    store.subscribe(() => this.updateState());
    this.updateState();
    this.draftMessage = { text: '' };
  }

  ngOnInit() {
  }

  updateState() {
    let state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  scrollToBottom() {
    let scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');

    if(scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage(): void {
    this.store.dispatch(ThreadActions.addMessage(
      this.currentThread,
      {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text
      }
    ));
    this.draftMessage = { text: '' }
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

}
