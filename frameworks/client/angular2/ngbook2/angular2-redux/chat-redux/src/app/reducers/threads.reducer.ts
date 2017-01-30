import { Action } from 'redux';
import { Thread } from '../models/thread';

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[];
  currentThreadId?: string;
  entities: ThreadsEntities;
}

const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {},
}

export const ThreadsReducer = function (state: ThreadsState = initialState, action: Action): ThreadsState {
  return state;
}