import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  inputs: ['message']
})
export class ChatMessageComponent implements OnInit {
  message: Message;

  constructor() { }

  ngOnInit() {
  }

}
