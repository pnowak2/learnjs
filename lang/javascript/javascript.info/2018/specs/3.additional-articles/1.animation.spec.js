describe('3. Animation', () => {
  describe('1.1 Bezier Curve', function () {
    it('should read the section', function () { });
  });

  describe('1.2 CSS Animation', function () {
    it('should read the section', function () { });
    describe('5 Properties of css transitions', () => {
      describe('transition, duration, timing-function, delay', () => {
        it('should read the section', () => { });
      });
      describe('Transition Timing Function', () => {
        it('should read the section', () => { });
        it('should have 2 points (0,0) and (1,1) always by default', () => { });
        it('should add more points to mark end of bezier handles (between 0 and 1)', () => { });
        it('should use steps() function for discrete changes (in steps)', () => { });
        it('should use transitionend event', () => { });
      });

      describe('Keyframes', () => {
        it('should define more complex transitions with many steps', () => { });
      });
    });
  });

  describe('1.3 Javascript Animations', () => {
    describe('setInterval', () => {
      it('should use the old fashion of animating properties', () => { });
      it('should use requestAnimationFrame to ask for animation frame', () => { });
      it('should use cancelAnimationFrame to ask for cancel of animation frame', () => { });
    });
  });
});