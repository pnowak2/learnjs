import { User } from './../models/user.model';
import { Thread } from './../models/thread.model';
import { Message } from './../models/message.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';

type MessagesOperation = (messages: Message[]) => Message[];

const initialMessages: Message[] = [];

export class MessagesService {
  messages$: Observable<Message[]>;
  newMessages$: Subject<Message> = new Subject<Message>();
  updates$: Subject<any> = new Subject<any>();
  create$: Subject<Message> = new Subject<Message>();
  markThreadAsRead$: Subject<any> = new Subject<any>();

  constructor() {
    this.messages$ = this.updates$
      .scan((messages: Message[], operation: MessagesOperation) => {
        return operation(messages);
      }, initialMessages)
      .publishReplay(1)
      .refCount();

    this.create$
      .map((message: Message): MessagesOperation => {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates$);

    this.markThreadAsRead$
      .map((thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map((message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates$);

    this.newMessages$.subscribe(this.create$);
  }

  addMessage(newMessage: Message) {
    this.newMessages$.next(newMessage);
  }

  messagesForThreadUser$(thread: Thread, user: User): Observable<Message> {
    return this.newMessages$
      .filter(msg => {
        return (msg.thread.id === thread.id) && (msg.author.id !== user.id);
      });
  }
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];

