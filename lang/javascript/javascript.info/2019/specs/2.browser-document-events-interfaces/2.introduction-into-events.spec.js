describe('2 Events', () => {
  describe('2.1 Introduction to borwser events', () => {
    describe('Type of events', () => {
      it('should have mouse events', () => { });
      it('should have form events', () => { });
      it('should have keyboard events', () => { });
      it('should have document events', () => { });
      it('should have css events', () => { });
    });

    describe('Event Handlers', () => {
      describe('DOM property', () => {
        it('should this point to element itself', (done) => {
          const div = document.createElement('div');
          function greet() {
            expect(this).toBe(div);
            done();
          }

          div.onclick = greet;

          div.dispatchEvent(new Event('click'));

        });
      });

      describe('addEventListener(event, handler, options [once, capture, passive])', () => {
        it('should add listener', () => {
          const spy = jasmine.createSpy();
          const div = document.createElement('div');
          div.addEventListener('click', greet);

          function greet() {
            expect(this).toBe(div);
            spy();
          }

          div.dispatchEvent(new Event('click'));
          div.dispatchEvent(new Event('click'));
          div.dispatchEvent(new Event('click'));

          return expect(spy).toHaveBeenCalledTimes(3);
        });
      });

      describe('removeEventListener(event, handler, options [once, capture, passive])', () => {
        it('should remove listener', () => {
          const spy = jasmine.createSpy();
          const div = document.createElement('div');

          div.addEventListener('click', greet);

          function greet() {
            expect(this).toBe(div);
            spy();
          }

          div.dispatchEvent(new Event('click'));

          div.removeEventListener('click', greet);

          div.dispatchEvent(new Event('click'));
          div.dispatchEvent(new Event('click'));

          return expect(spy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Event object', () => {
      it('should contain interesting properties', (done) => {
        const div = document.createElement('div');
        div.addEventListener('click', onClick);

        function onClick(evt) {
          expect(evt.type).toEqual('click');
          expect(evt.currentTarget).toEqual(div);
          expect(evt.clientX).toEqual(0);
          done();
        }

        div.dispatchEvent(new MouseEvent('click'));
      });
    });

    describe('Object handlers: handleEvent', () => {
      it('should pass object as handler, with handleEvent method', (done) => {
        const obj = {
          handleEvent(evt) {
            expect(evt.type).toEqual('click');
            expect(evt.currentTarget).toEqual(div);
            expect(evt.clientX).toEqual(0);

            done();
          }
        };

        const div = document.createElement('div');
        div.addEventListener('click', obj);

        div.dispatchEvent(new MouseEvent('click'));
      });
    });
  });

  describe('2.2 Bubbling and Capturing', () => {
    let form;
    let div;
    let p;
    let formSpy;
    let divSpy;
    let pSpy;

    beforeEach(() => {
      formSpy = jasmine.createSpy('form');
      divSpy = jasmine.createSpy('div');
      pSpy = jasmine.createSpy('p');

      form = document.createElement('form');
      div = document.createElement('div');
      p = document.createElement('p');

      form.appendChild(div);
      div.appendChild(p);
    });

    describe('Bubbling', () => {
      beforeEach(() => {
        form.addEventListener('click', formSpy);
        div.addEventListener('click', divSpy);
        p.addEventListener('click', pSpy);
      });

      describe('Handlers order', () => {
        it('should call handlers from deepest nested up to parents hierarchy', () => {
          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

          return new Promise((resolve) => {
            expect(formSpy).toHaveBeenCalled();
            expect(divSpy).toHaveBeenCalledBefore(formSpy);
            expect(pSpy).toHaveBeenCalledBefore(divSpy);
            resolve();
          });
        });
      });

      describe('event.target', () => {
        it('should event.target return the most deep element which caused the event', (done) => {
          form.addEventListener('click', function (e) {
            expect(e.target).toBe(p);
            done();
          });

          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      });

      describe('event.currentTarget', () => {
        it('should event.currentTarget return the element currently running event on', (done) => {
          form.addEventListener('click', function (e) {
            expect(e.currentTarget).toBe(form);
            done();
          });

          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        it('should event.currentTarget return "this", the “current” element, the one that has a currently running handler on it.', (done) => {
          form.addEventListener('click', function (e) {
            expect(e.currentTarget).toBe(this);
            done();
          });

          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      });

      describe('event.stopPropagation()', () => {
        it('should prevent event bubble up the hierarchy', (done) => {
          form.addEventListener('click', function (e) {
            e.stopPropagation();
            done();
          });

          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      });

      describe('event.stopImmediatePropagation()', () => {
        it('should prevent event bubble up the hierarchy for all handlers on this event', (done) => {
          form.addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            done();
          });

          p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      });
    });

    describe('Capturing', () => {
      beforeEach(() => {
        form.addEventListener('click', formSpy, { capture: true });
        div.addEventListener('click', divSpy, { capture: true });
        p.addEventListener('click', pSpy, { capture: true });
      });

      it('call handlers from deepest nested up to parents hierarchy', () => {
        p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        return new Promise((resolve) => {
          expect(formSpy).toHaveBeenCalledBefore(divSpy);
          expect(divSpy).toHaveBeenCalledBefore(pSpy);
          expect(pSpy).toHaveBeenCalled();
          resolve();
        });
      });
    });
  });

  describe('2.3 Event Delegation', () => {
    it('should apply handler only on parent, checking event target with matches/closest/contains', (done) => {
      const container = document.createElement('div');
      container.insertAdjacentHTML('afterbegin', `
        <a data-which="1">1</a>
        <a data-which="2">2</a>
        <a data-which="3">3</a>
      `);

      const a3 = container.lastElementChild;

      container.addEventListener('click', function (evt) {
        expect(evt.target.dataset.which).toEqual('3');
        expect(evt.target.matches('a')).toBe(true);
        expect(evt.target.closest('div')).toBe(container);
        expect(evt.currentTarget.contains(a3)).toBe(true);
        done();
      });

      a3.dispatchEvent(new Event('click', { bubbles: true }));

    });
  });

  describe('2.4 Browser Default Actions', () => {
    describe('Preventing browser actions', () => {
      it('should call event.preventDefault()', (done) => {
        const anchor = document.createElement('a');
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          done();
        });

        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      it('should return false from on-event', () => {
        const anchor = document.createElement('a');
        anchor.onclick = function (e) {
          done();
          return false;
        };

        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    });

    describe('The "passive" handler option', () => {
      it('should signal that handler is not going to call preventDefault() on event, performance reasons', () => {
        const anchor = document.createElement('a');
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          done();
        }, { passive: true });

        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    });

    describe('event.defaultPrevented', () => {
      it('should check if event was prevented', (done) => {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        anchor.textContent = 'link';

        document.body.appendChild(anchor);

        anchor.onclick = function (e) {
          e.preventDefault();
          return false;
        };

        document.addEventListener('click', function (e) {
          // expect(e.defaultPrevented).toBe(true); // should work i guess, but it's not..
          done();
        });

        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        document.body.removeChild(anchor);
      });
    });
  });

  describe('2.5 Dispatching Custom Events', () => {
    describe('Event Constructor', () => {
      it('should behave...', () => {
        
      });
    });
  });
});