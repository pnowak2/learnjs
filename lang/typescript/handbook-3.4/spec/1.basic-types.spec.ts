describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      let isDone: boolean = true;
      expect(isDone).toBeTruthy();
    });
  })

  describe('Number', () => {
    it('should declare it', () => {
      let decimal: number = 6;
      let hex: number = 0x6;
      let binary: number = 0b1101;
      let octal: number = 0o7;

      expect(decimal).toEqual(jasmine.any(Number));
      expect(hex).toEqual(jasmine.any(Number));
      expect(binary).toEqual(jasmine.any(Number));
      expect(octal).toEqual(jasmine.any(Number));
    });
  });

  describe('String', () => {
    it('should declare it', () => {
      let color: string = "blue";
      color = 'red';
    });
  });
});