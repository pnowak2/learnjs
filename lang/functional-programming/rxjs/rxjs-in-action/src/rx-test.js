import { expect } from 'chai';
import Rx from 'rxjs';

export const rxs = new Rx.TestScheduler(function (actual, expected) {
  expect(actual).to.deep.equal(expected);
});

export let hot = function () {
  return rxs.createHotObservable.apply(rxs, arguments);
}

export let cold = function () {
  return rxs.createColdObservable.apply(rxs, arguments);
}

export function expectObservable() {
  return rxs.expectObservable.apply(rxs, arguments);
}

export function expectSubscriptions() {
  return rxs.expectSubscriptions.apply(rxs, arguments);
}

// rxs.flush();
