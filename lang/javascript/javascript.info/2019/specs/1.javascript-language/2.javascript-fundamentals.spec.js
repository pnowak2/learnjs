describe('2. JavaScript Fundamentals', () => {
  describe('2.1 Hello world!', () => {
    it('should read the section', () => { });
  });

  describe('2.2 Code structure', () => {
    it('should read the section', () => { });
  });

  describe('2.3 Modern mode, "use strict"', () => {
    it('should read the section', () => { });
  });

  describe('2.4 Variables', () => {
    it('should declare variable', () => {
      let message = 'msg';
      expect(message).toEqual('msg');
    });

    it('should declare variables in same line', () => {
      let m1 = 1, m2 = 2;

      expect(m1).toEqual(1);
      expect(m2).toEqual(2);
    });
  });
});
