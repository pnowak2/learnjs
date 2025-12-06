import { describe, it, expect } from 'vitest';
import { add } from '../src/2.fundamentals/add';

describe('Fundamentals', () => {
  it('should..', () => {
    expect(2 + 3).toBe(5);
    expect(add(2, 7)).toEqual(9);
  });
});