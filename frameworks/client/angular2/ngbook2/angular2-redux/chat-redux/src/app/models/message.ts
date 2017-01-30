import { User } from './user';
import { Thread } from './thread';

export interface Message {
  id?: string;
  sentAt?: Date;
  isRead?: boolean;
  thread?: Thread;
  author?: User;
  text?: string;
}