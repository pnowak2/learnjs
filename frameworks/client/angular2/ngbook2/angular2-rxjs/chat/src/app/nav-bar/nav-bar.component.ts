import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ThreadsService } from '../services/threads.service';
import { MessagesService } from '../services/messages.service';
import { UserService } from '../services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(private messagesService: MessagesService,
    private threadsService: ThreadsService) { }

  ngOnInit() {
    this.messagesService.messages
      .combineLatest(this.threadsService.currentThread, (messages: Message[], currentThread: Thread) => [currentThread, messages])
      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount = _.reduce(messages, (sum: number, m: Message) => {
          let messageIsInCurrentThread: boolean = m.thread && currentThread && (currentThread.id === m.thread.id);
          if(m && !m.isRead && !messageIsInCurrentThread) {
            sum = sum + 1;
          }

          return sum;
        }, 0)

      })
  }

}
