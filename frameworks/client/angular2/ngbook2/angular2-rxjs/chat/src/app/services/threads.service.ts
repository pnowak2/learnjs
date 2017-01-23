import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { Thread } from '../models/thread';
import { MessagesService } from './messages.service';
import * as _ from 'underscore';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  constructor(private messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        let threads: {[key: string]: Thread} = {};

        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
        })
        return threads;
      })
  }
}