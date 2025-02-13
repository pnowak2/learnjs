import { Component, OnInit, EventEmitter } from '@angular/core';
import { Thread } from '../../models/thread';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
  inputs: ['thread', 'selected'],
  outputs: ['onThreadSelected']
})
export class ChatThreadComponent implements OnInit {
  thread: Thread;
  selected: boolean;
  onThreadSelected: EventEmitter<Thread>;
  
  constructor() { 
    this.onThreadSelected = new EventEmitter<Thread>();
  }

  ngOnInit() {
  }

  clicked(event: any): void {
    this.onThreadSelected.emit(this.thread);
    event.preventDefault();
  }

}
