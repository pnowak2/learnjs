import { Component, OnInit } from '@angular/core';
import { Thread } from '../models/thread';
import { ThreadsService } from '../services/threads.service';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
  inputs: ['thread']
})
export class ChatThreadComponent implements OnInit {
  private thread: Thread;
  selected: boolean;

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {
    this.threadsService.currentThread
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this.thread && (currentThread.id === this.thread.id);
      })
  }

  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }

}
