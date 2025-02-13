import { ThreadsService } from './threads.service';
import { MessagesService } from './messages.service';
import { Message } from '../models/message';
import { User } from '../models/user';
import { Thread } from '../models/thread';
import * as _ from 'underscore';

describe('ThreadsService', () => {
  let threadsService: ThreadsService;
  let messagesService: MessagesService;
  
  let nate: User;
  let felipe: User;
  let t1: Thread;
  let t2: Thread;
  let m1: Message;
  let m2: Message;
  let m3: Message;

  beforeEach(function () {
    messagesService = new MessagesService();
    threadsService = new ThreadsService(messagesService);

    nate = new User('Nate Murray', '');
    felipe = new User('Nate Murray', '');

    t1 = new Thread('t1', 'Thread 1', '');
    t2 = new Thread('t2', 'Thread 2', '');

    m1 = new Message({
      author: nate,
      text: 'Hi!',
      thread: t1
    });

    m2 = new Message({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: t1
    });

    m3 = new Message({
      author: nate,
      text: 'Did you bring the briefcase?',
      thread: t2
    });

  });

  it('should..', () => {
    threadsService.threads
      .subscribe((threadIdx: {[key: string]: Thread}) => {
        let threads: Thread[] = _.values(threadIdx);
        let threadNames: string = _.map(threads, (t: Thread) => t.name);

        console.log(`threads (${threads.length}): ${threadNames}`);
      })

      messagesService.addMessage(m1);
      messagesService.addMessage(m2);
      messagesService.addMessage(m3);
  });
});