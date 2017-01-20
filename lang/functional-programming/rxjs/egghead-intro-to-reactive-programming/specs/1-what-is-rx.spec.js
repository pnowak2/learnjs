import { expect } from 'chai';
import { Observable } from 'rxjs';

describe('1 - Intro', () => {
  let arr = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

  it('should use array and assign to result', () => {
    let result = arr;
    expect(result).to.eql(['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']);
  });

  it('should sum array items', () => {
    let result = arr
      .map(x => parseInt(x))
      .filter(x => !isNaN(x))
      .reduce((x, y) => x + y);
    
    expect(result).to.eql(33);

  });

  xit('should use Observable to emit array item with time interval', () => {
    let source = Observable
      .interval(400)
      .take(9)
      .map( i => arr[i])

    let result = source;

    result.subscribe(x => console.log(x))
  });

  xit('should use Observable to emit array item with time interval', () => {
    let source = Observable
      .interval(400)
      .take(9)
      .map( i => arr[i])
      .map(x => parseInt(x))
      .filter(x => !isNaN(x))
      .reduce((x, y) => x + y);

    source.subscribe(x => console.log(x))
  });
});