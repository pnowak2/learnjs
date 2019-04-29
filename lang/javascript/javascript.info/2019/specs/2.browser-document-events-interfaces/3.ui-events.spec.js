describe('3 UI Events', () => {
  describe('3.1 Mouse Events Basics', () => {
    describe('Getting the button: which', () => {
      it('should left button be used', (done) => {
        const container = document.createElement('div');
        let evt = new MouseEvent('click', { button: 0 });

        container.addEventListener('click', function (evt) {
          expect(evt.which).toEqual(1);
          done();
        });

        container.dispatchEvent(evt);
      });

      it('should middle button be used', (done) => {
        const container = document.createElement('div');
        let evt = new MouseEvent('click', { button: 1 });

        container.addEventListener('click', function (evt) {
          expect(evt.which).toEqual(2);
          done();
        });

        container.dispatchEvent(evt);
      });

      it('should right button be used', (done) => {
        const container = document.createElement('div');
        let evt = new MouseEvent('click', { button: 2 });

        container.addEventListener('click', function (evt) {
          expect(evt.which).toEqual(3);
          done();
        });

        container.dispatchEvent(evt);
      });
    });

    describe('Modifiers: shift, alt, ctrl and meta', () => {
      it('should read modifiers keys from event', () => {
        const container = document.createElement('div');
        let evt = new MouseEvent('click', { button: 0, altKey: true, shiftKey: true, ctrlKey: true, metaKey: true });

        container.addEventListener('click', function (evt) {
          expect(evt.altKey).toBe(true);
          expect(evt.shiftKey).toBe(true);
          expect(evt.ctrlKey).toBe(true);
          expect(evt.metaKey).toBe(true);
          done();
        });

        container.dispatchEvent(evt);
      });
    });

    describe('Coordinates', () => {
      describe('Window coordinates: clientX/Y', () => {
        it('should be relative to window', (done) => {
          const container = document.createElement('div');
          let evt = new MouseEvent('click', { clientX: 5, clientY: 6 });

          container.addEventListener('click', function (evt) {
            expect(evt.clientX).toEqual(5);
            expect(evt.clientY).toEqual(6);
            done();
          });

          container.dispatchEvent(evt);
        });
      });

      describe('Document coordinates: pageX/Y', () => {
        it('should be relative to page', (done) => {
          const container = document.createElement('div');
          let evt = new MouseEvent('click', { pageX: 5, pageY: 6 });

          container.addEventListener('click', function (evt) {
            // expect(evt.pageX).toEqual(5);
            // expect(evt.pageY).toEqual(6);
            done();
          });

          container.dispatchEvent(evt);
        });
      });
    });
  });

  describe('3.2 Moving: mouseover/out, mousenter/leave', () => {
    describe('Mouse Over event', () => {
      describe('event.target property', () => {
        it('should point to element to which the mouse points now', () => { });
      });
      describe('event.relatedTarget property', () => {
        it('should point to element from which the mouse came', () => { });
      });
    });

    describe('Mouse Out event', () => {
      describe('event.target property', () => {
        it('should point to element to which the mouse left', () => { });
      });
      describe('event.relatedTarget property', () => {
        it('should point to new under the pointer element (that mouse left for)', () => { });
      });
    });

    describe('Events frequency', () => {
      it('should read the section', () => { });
    });

    describe('Extra mouseout when leaving for a child', () => {
      it('should call mouseout when leaving for a child, cause only one element can be directly at cursor at a time in browser', () => { });
      it('should use mouseenter, mouseleave instead, which do not bubble and dont behave like above', () => { });
    });
  });

  describe('3.3 Drag and drop with mosue events', () => {
    describe('Drag and Drop algorithm', () => {
      it('should perform manual drag and drop excercise', () => { });
    });

    describe('Detecting droppables', () => {
      it('should perform manual drag and drop excercise', () => { });
    });
  });

  describe('3.4 Keyboard Events', () => {
    describe('Keyboard: keydown and keyup', () => {
      describe('event.key', () => {
        it('should provide exact character', (done) => {
          const container = document.createElement('div');
          let evt = new KeyboardEvent('keyup', { key: 'a' });
  
          container.addEventListener('keyup', function (evt) {
            expect(evt.key).toEqual('a');
            done();
          });
  
          container.dispatchEvent(evt);
        });
      });

      describe('event.code', () => {
        it('should provide exact character', (done) => {
          const container = document.createElement('div');
          let evt = new KeyboardEvent('keyup', { key: 'a', code: 'KeyA' });
  
          container.addEventListener('keyup', function (evt) {
            expect(evt.code).toEqual('KeyA');
            done();
          });
  
          container.dispatchEvent(evt);
        });
      });
    });
  });

  describe('3.5 Scrolling', () => {
    it('should define scroll event', (done) => {
      const container = document.createElement('div');
      container.style.cssText = `
        width: 10px;
        height: 10px;
      `;
      container.textContent = 'fsdf sadf sa fdsad fsadf sadfsadfsafdsa';
      container.style.overflow = 'scroll';
      document.body.append(container);
      
      container.addEventListener('scroll', function (evt) {
        document.body.removeChild(container);
        done();
      });

      container.scrollBy(5, 5);
    });
  });
});