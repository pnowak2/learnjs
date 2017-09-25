import { reducer, incrementAction, decrementAction } from './02-adjusting-reducer';

describe('Adjusting Reducer', () => {
  it('should return original state', () => {
    const result = reducer(0, null);
    expect(result).toBe(0);
  });

  it('should increment state', () => {
    let result = reducer(0, incrementAction);
    expect(result).toBe(1);

    result = reducer(1, incrementAction);
    expect(result).toBe(2);

  });

  it('should decrement state', () => {
    let result = reducer(0, decrementAction);
    expect(result).toBe(-1);

    result = reducer(5, decrementAction);
    expect(result).toBe(4);
  });
});
