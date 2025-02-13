import { UsersService } from './../services/users.service';
import { ThreadsService } from './../services/threads.service';
import { MessagesService } from './../services/messages.service';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { User } from './../models/user.model';
import { Thread } from './../models/thread.model';
import { Message } from './../models/message.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(
    private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private usersService: UsersService,
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.messages = this.threadsService.currentThreadMessages$;
    this.draftMessage = new Message();

    this.threadsService.currentThread$.subscribe((thread: Thread) => {
      this.currentThread = thread;
    });

    this.usersService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
    });

    this.messages.subscribe((messages: Array<Message>) => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: KeyboardEvent): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
