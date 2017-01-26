import { expect } from 'chai';
import Rx from 'rxjs';

export const rxs = new Rx.TestScheduler(function (actual, expected) {
  expect(actual).to.deep.equal(expected);
});

export let hot = rxs.createHotObservable.bind(rxs);
export let cold = rxs.createColdObservable.bind(rxs);
export let expectObservable = rxs.expectObservable.bind(rxs);
export let expectSubscriptions = rxs.expectSubscriptions.bind(rxs);

// rxs.flush();
