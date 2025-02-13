import { MessagesService } from './messages.service';
import { Message } from '../models/message';
import { User } from '../models/user';
import { Thread } from '../models/thread';

describe('MessagesService', () => {
  let user: User;
  let thread: Thread;
  let messagesService: MessagesService;
  let m1: Message;
  let m2: Message;

  beforeEach(function () {
    user = new User('piotr', '');
    thread = new Thread('thread 1', 'piotr', '');
    messagesService = new MessagesService();

    m1 = new Message({
      author: User,
      text: 'Hi!',
      thread: thread
    });

    m2 = new Message({
      author: User,
      text: 'bye!',
      thread: thread
    });
  });

  it('should emit a message each time message was added', (done) => {
    let spy = jasmine.createSpy('');

    let expected: Array<string> = ['Hi!', 'bye!'],
      index: number = 0;

    let o = messagesService.newMessages
      .take(2)
      .subscribe((message: Message) => {
        expect(message.text).toEqual(expected[index++])
        spy(message.text);
      }, fail, done);

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
  });
});