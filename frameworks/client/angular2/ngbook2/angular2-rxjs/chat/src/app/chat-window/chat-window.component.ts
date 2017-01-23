import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ThreadsService } from '../services/threads.service';
import { MessagesService } from '../services/messages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private userService: UserService,
    private el: ElementRef) {

  }

  ngOnInit() {
    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message();

    this.threadsService.currentThread
      .subscribe((thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      });

    this.messages.subscribe((messages: Message[]) => {
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    })
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;

    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any) {
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }


}
