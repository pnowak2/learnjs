import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { Thread } from '../models/thread';
import { User } from '../models/user';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Array<Message>): Array<Message>
}

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates
      .scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages)
      .publishReplay(1)
      .refCount();

    this.create
      .map(function (message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        }
      })
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
      .map((thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map((message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }

            return message;
          });
        }
      })
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        return (
          (message.thread.id === thread.id) &&
          (message.author.id !== user.id)
        )
      })
  }
}

export var messagesServiceInjectables: Array<any> = [
  MessagesService
]
