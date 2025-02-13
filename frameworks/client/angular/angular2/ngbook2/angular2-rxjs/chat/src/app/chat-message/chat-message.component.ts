import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ThreadsService } from '../services/threads.service';
import { MessagesService } from '../services/messages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  inputs: ['message']
})
export class ChatMessageComponent implements OnInit {
  message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
        if(this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
  }

}
