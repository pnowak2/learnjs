import { Action } from 'redux';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import * as ThreadActions from '../actions/thread.actions';

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: Array<string>;
  currentThreadId?: string;
  entities: ThreadsEntities;
}

const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {},
}

export const ThreadsReducer = function (state: ThreadsState = initialState, action: Action): ThreadsState {
  switch (action.type) {
    case ThreadActions.ADD_THREAD: {
      const thread = (action as ThreadActions.AddThreadAction).thread;

      if (state.ids.includes(thread.id)) {
        return state;
      }

      return {
        ids: [...state.ids, thread.id],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: thread
        })
      };
    }
    case ThreadActions.ADD_MESSAGE: {
      const thread: Thread = (action as ThreadActions.AddMessageAction).thread;
      const message: Message = (action as ThreadActions.AddMessageAction).message;
      const isRead = message.thread.id === state.currentThreadId ? true : message.isRead;
      const newMessage = Object.assign({}, message, { isRead: isRead });
      const oldThread = state.entities[thread.id];
      const newThread = Object.assign({}, oldThread, {
        messages: [...oldThread.messages, newMessage]
      });

      return {
        ids: state.ids,
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      }
    }
    case ThreadActions.SELECT_THREAD: {
      const thread = (action as ThreadActions.SelectThreadAction).thread;
      const oldThread = state.entities[thread.id];
      const newMessages = oldThread.messages.map(
        (message) => Object.assign({}, message, { isRead: true })
      );
      const newThread = Object.assign({}, oldThread, {
        messages: newMessages
      });

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      }
    }
    default:
      return state;
  }
}