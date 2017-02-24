/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

function sleep(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  }
  while (curDate.getMilliseconds() - date.getMilliseconds() < millis);
}

describe('Zones', () => {

  let foo = () => { console.log('foo'); sleep(10) };
  let bar = () => { console.log('bar'); sleep(20) };
  let baz = () => { console.log('baz'); sleep(30) };

  it('should measure time for synchronous program', () => {
    var start,
      time = 0,
      timer = Date.now;

    // start timer
    start = timer();
    foo();
    bar();
    baz();
    // stop timer
    time = timer() - start;
    // log time in ms
    console.log('sync elapsed: ', Math.floor(time * 100) / 100 + 'ms');
  });

  it('should measure time for synchronous program', () => {
    var start,
      time = 0,
      timer = Date.now;

    // start timer
    start = timer();
    setTimeout(foo, 0);
    setTimeout(bar, 0);
    setTimeout(baz, 0);
    // stop timer
    time = timer() - start;
    // log time in ms
    console.log('async elapsed: ', Math.floor(time * 100) / 100 + 'ms');
  });
});
