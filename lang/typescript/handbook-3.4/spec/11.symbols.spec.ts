describe('11 Symbols', () => {
  it('should create symbol', () => {
    let sym = Symbol();
    let sym2 = Symbol('key');
  });

  it('should be unique', () => {
    let sym2 = Symbol('key');
    let sym3 = Symbol('key');
    
    expect(sym2 === sym3).toBeFalsy();
  });

  it('should use symbols as props of object', () => {
    const sym = Symbol();

    const obj = {
      [sym]: 'yay'
    }

    expect(obj[sym]).toEqual('yay');
  });
});