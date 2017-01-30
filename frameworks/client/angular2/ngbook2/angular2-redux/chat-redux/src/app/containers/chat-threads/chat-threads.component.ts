import { Component, OnInit, Inject } from '@angular/core';
import { Thread } from '../../models/thread';
import { Store } from 'redux';
import { AppStore } from '../../reducers/app-store';
import { AppState } from '../../reducers/index';
import { getAllThreads, getCurrentThread } from '../../reducers/threads.reducer';
import * as ThreadActions  from '../../actions/thread.actions';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Thread[];
  currentThreadId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    let state = this.store.getState();
    this.threads = getAllThreads(state);
    this.currentThreadId = getCurrentThread(state).id;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(ThreadActions.selectThread(thread));
  }

  ngOnInit() {
  }

}
