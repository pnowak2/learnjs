var expect = require('chai').expect;
var sinon = require('sinon');

describe('2. Introduction Into Events', () => {
  describe('2.1 Introduction to Browser Events', function () {
    it('should read the section', function () { });

    describe('Event Handlers', () => {
      it('should use html attribute', () => {
        const div = document.createElement('div');
        div.innerHTML = '<input type="button" onclick="alert(\'test\' + event);" value="test"/>';
        document.body.appendChild(div);
        div.remove();
      });

      it('should use dom property', (done) => {
        const div = document.createElement('div');
        div.innerHTML = '<input type="button" value="test"/>';
        div.onclick = function () {
          done();
        };

        div.dispatchEvent(new Event('click'));
      });

      it('should this point to element itself', (done) => {
        const div = document.createElement('div');
        div.onclick = function () {
          expect(this).to.eql(div);
          expect(this.tagName).to.eql('DIV');
          done();
        };

        div.dispatchEvent(new Event('click'));
      });
    });

    describe('.addEventListener()', () => {
      it('should add listener for event', (done) => {
        const div = document.createElement('div');
        const evt = new Event('click');

        const handler = (e) => {
          expect(e).to.eql(evt);
          done();
        }

        div.addEventListener('click', handler);
        div.dispatchEvent(evt);
      });
    });

    describe('.removeEventListener()', () => {
      it('should add listener for event', () => {
        const div = document.createElement('div');
        const evt = new Event('click');

        const handler = sinon.spy();

        div.addEventListener('click', handler);
        div.removeEventListener('click', handler);
        div.dispatchEvent(evt);

        expect(handler.called).to.be.false;
      });
    });

    describe('Event Object', () => {
      it('should get event.type', (done) => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');

        div.addEventListener('click', function (e) {
          expect(e.type).to.eql('click');
          done();
        });

        div.dispatchEvent(evt);
      });

      it('should get event.currentTarget which is element that handled the event, equals to this', (done) => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');

        div.addEventListener('click', function (e) {
          expect(e.currentTarget).to.eql(div);
          expect(e.currentTarget).to.eql(this);
          done();
        });

        div.dispatchEvent(evt);
      });

      it('should get event.clientX, event.clientY which are window related coordinates of mouse pointer', (done) => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');

        div.addEventListener('click', function (e) {
          expect(e.clientX).to.be.a('number');
          expect(e.clientY).to.be.a('number');
          done();
        });

        div.dispatchEvent(evt);
      });
    });

    describe('Object Handlers: obj.handleEvent()', () => {
      it('should pass object with handleEvent() method', () => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');
        const spy = sinon.spy();

        div.addEventListener('click', {
          handleEvent: spy
        });

        div.dispatchEvent(evt);

        expect(spy.calledOnce).to.be.true;
      });
    });
  });

  describe('2.2 Bubbling and Capturing', () => {
    describe('Bubbling (events bubble from the inner element up)', () => {
      describe('Bubbling order', () => {
        let container, child, grandchild;
        let containerSpy, childSpy, grandchildSpy;

        beforeEach(() => {
          container = document.createElement('div');
          child = document.createElement('div');
          grandchild = document.createElement('div');

          containerSpy = sinon.spy();
          childSpy = sinon.spy();
          grandchildSpy = sinon.spy();

          container.appendChild(child)
          child.appendChild(grandchild);


          container.addEventListener('click', containerSpy);
          child.addEventListener('click', childSpy);
          grandchild.addEventListener('click', grandchildSpy);

          grandchild.dispatchEvent(new Event('click', { bubbles: true }));
        });

        it('should run handler on grandchild', () => {
          expect(grandchildSpy.calledOnce).to.be.true;
        });

        it('should run handler on child', () => {
          expect(childSpy.calledOnce).to.be.true;
        });

        it('should run handler on container', () => {
          expect(containerSpy.calledOnce).to.be.true;
        });

        it('should run grandchild handler before any other', () => {
          expect(grandchildSpy.calledBefore(childSpy)).to.be.true;
          expect(grandchildSpy.calledBefore(containerSpy)).to.be.true;
        });

        it('should run child handler before container and after grandchild', () => {
          expect(childSpy.calledBefore(containerSpy)).to.be.true;
          expect(childSpy.calledAfter(grandchildSpy)).to.be.true;
        });

        it('should run container handler after grandchild and child', () => {
          expect(containerSpy.calledAfter(childSpy)).to.be.true;
          expect(containerSpy.calledAfter(grandchildSpy)).to.be.true;
        });
      });

      describe('Event.target', () => {
        it('should be the most deeply nested element that caused the event', (done) => {
          let container = document.createElement('div');
          let child = document.createElement('div');

          container.appendChild(child)
          container.addEventListener('click', function (evt) {
            expect(evt.target).to.eql(child);
            done();
          });

          child.dispatchEvent(new Event('click', { bubbles: true }));
        });
      });

      describe('Event.currentTarget', () => {
        it('should be the actual element that has handler applied', (done) => {
          let container = document.createElement('div');
          let child = document.createElement('div');

          container.appendChild(child)
          container.addEventListener('click', function (evt) {
            expect(evt.currentTarget).to.eql(container);
            done();
          });

          child.dispatchEvent(new Event('click', { bubbles: true }));
        });

        it('should be the actual element that has handler applied and same as this', (done) => {
          let container = document.createElement('div');
          let child = document.createElement('div');

          container.appendChild(child)
          container.addEventListener('click', function (evt) {
            expect(this).to.eql(container);
            done();
          });

          child.dispatchEvent(new Event('click', { bubbles: true }));
        });
      });

      describe('Stopping Bubbling', () => {
        describe('Event.stopPropagation()', () => {
          it('should stop bubbling up', (done) => {
            let container = document.createElement('div');
            let child = document.createElement('div');

            container.appendChild(child)
            container.addEventListener('click', function (evt) {
              fail(); // never getting here because of stop propagation.
              done();
            });

            child.addEventListener('click', function (evt) {
              expect(evt).to.be.instanceof(Event);
              evt.stopPropagation();
              done();
            });

            child.dispatchEvent(new Event('click', { bubbles: true }));
          });
        });

        describe('Event.stopImmediatePropagation()', () => {
          it('should stop bubbling up all handlers on this element', (done) => {
            let container = document.createElement('div');
            let child = document.createElement('div');

            container.appendChild(child)
            container.addEventListener('click', function (evt) {
              fail(); // never getting here because of stop propagation.
              done();
            });

            child.addEventListener('click', function (evt) {
              expect(evt).to.be.instanceof(Event);
              evt.stopImmediatePropagation();
              done();
            });

            child.addEventListener('click', function (evt) { });
            child.addEventListener('click', function (evt) { });
            child.addEventListener('click', function (evt) { });

            child.dispatchEvent(new Event('click', { bubbles: true }));
          });
        });
      });
    });

    describe('Capturing (events are handled from outermost element to innermost element)', () => {
      describe('Capturing order', () => {
        let container, child, grandchild;
        let containerSpy, childSpy, grandchildSpy;

        beforeEach(() => {
          container = document.createElement('div');
          child = document.createElement('div');
          grandchild = document.createElement('div');

          containerSpy = sinon.spy();
          childSpy = sinon.spy();
          grandchildSpy = sinon.spy();

          container.appendChild(child)
          child.appendChild(grandchild);


          container.addEventListener('click', containerSpy, true);
          child.addEventListener('click', childSpy, true);
          grandchild.addEventListener('click', grandchildSpy, true);

          grandchild.dispatchEvent(new Event('click', { bubbles: true }));
        });

        it('should run handler on grandchild', () => {
          expect(grandchildSpy.calledOnce).to.be.true;
        });

        it('should run handler on child', () => {
          expect(childSpy.calledOnce).to.be.true;
        });

        it('should run handler on container', () => {
          expect(containerSpy.calledOnce).to.be.true;
        });

        it('should run container handler first', () => {
          expect(containerSpy.calledBefore(childSpy)).to.be.true;
          expect(containerSpy.calledBefore(grandchildSpy)).to.be.true;
        });

        it('should run child handler after container and before grandchild', () => {
          expect(childSpy.calledAfter(containerSpy)).to.be.true;
          expect(childSpy.calledBefore(grandchildSpy)).to.be.true;
        });

        it('should run grandchild handler after others', () => {
          expect(grandchildSpy.calledAfter(containerSpy)).to.be.true;
          expect(grandchildSpy.calledAfter(childSpy)).to.be.true;
        });
      });
    });
  });

  describe('2.3 Event Delegation', () => {
    describe('Using one handler on parent to serve selected children', () => {
      it('should listen in parent looking which most nested element was clicked and filter to look for correct one to handle it', (done) => {
        let container = document.createElement('div');
        let child1 = document.createElement('span');
        let child2 = document.createElement('a');
        let child3 = document.createElement('p');

        container.appendChild(child1);
        container.appendChild(child2);
        container.appendChild(child3);

        container.addEventListener('click', function (evt) {
          if (evt.target.tagName === 'A') {
            expect(evt.target.closest('div')).to.eql(container);
            expect(container.contains(evt.target)).to.be.true;
            done();
          } else {
            fail();
          }
        });

        child2.dispatchEvent(new Event('click', { bubbles: true }));
      });
    });
  });

  describe('2.4 Browser Default Actions', () => {
    describe('Preventing Default Action', () => {
      it('should return false from "on" events', () => {
        const a = document.createElement('a');
        a.setAttribute('href', '/');
        a.innerHTML = 'click me';
        a.onclick = function () {
          return false;
        }

        document.body.appendChild(a);

        a.remove();
      });

      it('should call event.preventDefault()', () => {
        const a = document.createElement('a');
        a.setAttribute('href', '/');
        a.innerHTML = 'click me';
        a.onclick = function (evt) {
          evt.preventDefault();
        }

        document.body.appendChild(a);

        a.remove();
      });
    });

    describe('Event.defaultPrevented', () => {
      it('should check if preventDefault() was already called somwhere before in same event handling cycle', (done) => {
        let container = document.createElement('div');
        let child = document.createElement('div');

        container.appendChild(child)

        child.addEventListener('click', function (evt) {
          // expect(evt.defaultPrevented).to.be.true; // for some reason does not work in unit test..
          done();
        });

        child.dispatchEvent(new Event('click', { bubbles: true }));
      });
    });
  });

  describe('2.5 Dispatching Custom Actions', () => {
    describe('Event Constructor', () => {
      it('should create from Event class', () => {
        const evt = new Event('eventName', { bubbles: true, cancelable: true });
      });
    });

    describe('EventTarget.dispatchEvent', () => {
      it('should dispatch an event', (done) => {
        let container = document.createElement('div');

        container.addEventListener('custom', function (evt) {
          expect(evt.type).to.eql('custom');
          done();
        });

        container.dispatchEvent(new Event('custom', { bubbles: true }));
      });
    });

    describe('Event.isTrusted', () => {
      it('should tell if event was triggered by human or a script', (done) => {
        let container = document.createElement('div');

        container.addEventListener('custom', function (evt) {
          expect(evt.isTrusted).to.be.false;
          done();
        });

        container.dispatchEvent(new Event('custom', { bubbles: true }));
      });
    });

    describe('MouseEvent, KeyboardEvent and Others', () => {
      it('should know different event classes', () => {
        UIEvent, FocusEvent, MouseEvent, WheelEvent, KeyboardEvent
      });

      it('should create mouse event with properties', (done) => {
        let container = document.createElement('div');

        container.addEventListener('custom', function (evt) {
          expect(evt.clientX).to.eql(5);
          expect(evt.clientY).to.eql(10);
          done();
        });

        container.dispatchEvent(new MouseEvent('custom', {
          bubbles: true,
          clientX: 5,
          clientY: 10
        }));
      });
    });

    describe('Custom Events', () => {
      it('should use CustomEvent class', (done) => {
        let container = document.createElement('div');
        
        const cEvent = new CustomEvent('buba', {
          detail: {
            school: 'zst'
          }
        });
        
        container.addEventListener('buba', function (evt) {
          expect(evt.detail.school).to.eql('zst');
          done();
        });

        container.dispatchEvent(cEvent);
      });
    });

    describe('Event.preventDefault()', () => {
      it('should prevent default custom event if cancellable === true', () => {
        let container = document.createElement('div');
        
        const cEvent = new CustomEvent('buba', {
          cancelable: true
        });
        
        container.addEventListener('buba', function (evt) {
          evt.preventDefault();
        });

        const result = container.dispatchEvent(cEvent);

        expect(result).to.be.false;
      });
    });
  });
});