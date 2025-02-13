import { Action, Reducer } from './lib/mini-redux';
export interface AppState {
  messages: string[];
}

export interface AddMessageAction extends Action {
  message: string;
}

export interface DeleteMessageAction extends Action {
  index: number;
}

export const reducer: Reducer<AppState> = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        messages: state.messages.concat((<AddMessageAction>action).message)
      };
    case 'DELETE_MESSAGE':
      const idx = (<DeleteMessageAction>action).index;
      return {
        messages: [
          ...state.messages.slice(0, idx),
          ...state.messages.slice(idx + 1, state.messages.length)
        ]
      };
  }
};

