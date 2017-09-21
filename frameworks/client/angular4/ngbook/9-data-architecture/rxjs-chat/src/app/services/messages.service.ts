import { User } from './../models/user.model';
import { Thread } from './../models/thread.model';
import { Message } from './../models/message.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator.filter';
import 'rxjs/add/operator.scan';

type MessagesOperation = (messages: Message[]) => Message[];

const initialMessages: Message[] = [];

export class MessagesService {
  messages$: Observable<Message[]>;
  newMessages$: Subject<Message> = new Subject<Message>();
  updates$: Subject<any> = new Subject<any>();

  constructor() {
    this.messages$ = this.updates$
    .scan((messages: Message[], operation: MessagesOperation) => {
      return operation(messages);
    }, initialMessages)
    .publishReplay(1)
    .refCount();
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

