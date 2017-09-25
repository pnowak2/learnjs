import { ThreadsService } from './../services/threads.service';
import { Thread } from './../models/thread.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected = false;

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {
    this.threadsService.currentThread$
      .subscribe((currentThread: Thread) => {
        this.selected =
          currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  onClicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
