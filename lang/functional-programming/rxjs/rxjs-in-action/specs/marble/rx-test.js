import { expect } from 'chai';
import Rx from 'rxjs';

export const rxTestScheduler = new Rx.TestScheduler(function (actual, expected) {
  expect(actual).to.deep.equal(expected);
});

export let hot = rxTestScheduler.createHotObservable;
export let rxExpect = rxTestScheduler.expectObservable;
