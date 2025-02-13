import { Message } from './message.model';
import { uuid } from '../utils/uuid';

export class Thread {
  id: string;
  lastMessage: Message;
  name: string;
  avatarSrc: string;

  constructor(
    id?: string,
    name?: string,
    avatarSrc?: string) {
    this.id = id || uuid();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
