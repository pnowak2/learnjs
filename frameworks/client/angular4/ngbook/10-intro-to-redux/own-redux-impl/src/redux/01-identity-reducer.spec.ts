import { identityReducer } from './01-identity-reducer';

describe('Identity Reducer', () => {
  it('should return original state', () => {
    const result = identityReducer(0, null);
    expect(result).toBe(0);
  });
});
