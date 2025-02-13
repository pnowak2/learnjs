import { Message } from './message';

export interface Thread {
  id: string;
  name: string;
  avatarSrc: string;
  messages: Message[]
}