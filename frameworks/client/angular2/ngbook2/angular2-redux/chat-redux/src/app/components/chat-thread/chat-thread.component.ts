import { Component, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
  inputs: ['thread', 'selected']
})
export class ChatThreadComponent implements OnInit {
  thread: Thread;
  selected: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
