import { Reducer, Action, Store } from 'redux';
import { AddMessageAction, DeleteMessageAction } from './app-reducer';
import { MessageActions } from './message-actions';

describe('Message Actions', () => {
  describe('api', () => {
    describe('addMessage()', () => {
      it('should be defined', () => {
        expect(MessageActions.addMessage).toEqual(jasmine.any(Function));
      });

      it('should return proper message', () => {
        let action = MessageActions.addMessage('my message');
        expect(action).toEqual({
          type: 'ADD_MESSAGE',
          message: 'my message'
        })
      });
    });

    describe('deleteMessage()', () => {
      it('should be defined', () => {
        expect(MessageActions.deleteMessage).toEqual(jasmine.any(Function));
      });

      it('should return proper message', () => {
        let action = MessageActions.deleteMessage(2);
        expect(action).toEqual({
          type: 'DELETE_MESSAGE',
          index: 2
        })
      });
    });
  });
});