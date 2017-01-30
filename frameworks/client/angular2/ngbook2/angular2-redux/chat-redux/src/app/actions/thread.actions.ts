import { Action, ActionCreator } from 'redux';
import { Thread } from '../models/thread';

export const ADD_THREAD = '[Thread] Add'

export interface AddThreadAction extends Action {
  thread: Thread;
}

export const addThread: ActionCreator<AddThreadAction> = (thread) => ({
  type: ADD_THREAD,
  thread: thread
})

