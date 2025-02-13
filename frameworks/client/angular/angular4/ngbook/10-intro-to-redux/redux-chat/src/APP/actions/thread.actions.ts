import { Message } from './../models/message.model';
import { Thread } from './../models/thread.model';
import { Action, ActionCreator } from 'redux';
import { uuid } from '../utils/uuid';

export const ADD_THREAD = '[Thread] Add';
export interface AddThreadAction extends Action {
  thread: Thread;
}
export const addThread: ActionCreator<AddThreadAction> = (thread: Thread) => ({
  type: ADD_THREAD,
  thread: thread
});

export const ADD_MESSAGE = '[Thread] Add Message';
export interface AddMessageAction extends Action {
  thread: Thread;
  message: Message;
}
export const addMessage: ActionCreator<AddMessageAction> = (thread: Thread, messageArgs: Message) => {
  const defaults = {
    id: uuid(),
    sentAt: new Date(),
    isRead: false,
    thread: thread
  };

  const message: Message = Object.assign({}, defaults, messageArgs);

  return {
    type: ADD_MESSAGE,
    thread: thread,
    message: message
  };
};

export const SELECT_THREAD = '[Thread] Select';
export interface SelectThreadAction extends Action {
  thread: Thread;
}
export const selectThread: ActionCreator<SelectThreadAction> = (thread) => ({
  type: SELECT_THREAD,
  thread: thread
});
