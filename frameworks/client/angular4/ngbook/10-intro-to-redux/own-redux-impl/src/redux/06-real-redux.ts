import {
  Action,
  Reducer,
  Store,
  createStore
} from 'redux';

export interface AppState {
  messages: string[];
}

export const initialState: AppState = { messages: [] };

export const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
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

export const store: Store<AppState> = createStore<AppState>(reducer);

export interface AddMessageAction extends Action {
  message: string;
}

export interface DeleteMessageAction extends Action {
  index: number;
}

export class MessageActions {
  public static addMessage(message: string): AddMessageAction {
    return {
      type: 'ADD_MESSAGE',
      message: message
    } as AddMessageAction;
  }

  public static deleteMessage(index: number): DeleteMessageAction {
    return {
      type: 'DELETE_MESSAGE',
      index: index
    } as DeleteMessageAction;
  }
}
