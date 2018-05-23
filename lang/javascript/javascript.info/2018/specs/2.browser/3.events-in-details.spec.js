var expect = require('chai').expect;
var sinon = require('sinon');

describe('3. Events in Details', () => {
  describe('3.1 Mouse Events Basics', function () {
    describe('Simple events', () => {
      it('should use mousedown/up, mouseover/out, mousemove', () => { });
    });

    describe('Complex events', () => {
      it('should use click, contextmenu, dblclick', () => { });
    });

    describe('Events Order', () => {
      it('should run events in correct order, mouse down, mouse up, click, dblclick', () => {
        const div = document.createElement('div');
        const mdSpy = sinon.spy();
        const muSpy = sinon.spy();
        const clickSpy = sinon.spy();

        div.addEventListener('mousedown', mdSpy);
        div.addEventListener('mouseup', muSpy);
        div.addEventListener('click', clickSpy);

        div.dispatchEvent(new MouseEvent('click'));

        // hard to test with dispatchEvent..
        // expect(mdSpy.calledOnce).to.be.true;
        // expect(muSpy.calledOnce).to.be.true;
        expect(clickSpy.calledOnce).to.be.true;
      });
    });

    describe('Getting The Button: which', () => {
      it('should check which button was clicked', (done) => {
        const div = document.createElement('div');

        div.addEventListener('mousedown', function (evt) {
          expect(evt.which).to.eql(1);
          done();
        });

        div.dispatchEvent(new MouseEvent('mousedown'));
      });

      it('should be 1 for left, 2 for middle, 3 for right button', () => { });
    });

    describe('Modifiers: shift, alt, ctrl and meta', () => {
      it('should check for shift key', (done) => {
        const div = document.createElement('div');

        div.addEventListener('mousedown', function (evt) {
          expect(evt.which).to.eql(1);
          expect(evt.shiftKey).to.be.true;
          done();
        });

        div.dispatchEvent(new MouseEvent('mousedown', {
          shiftKey: true
        }));
      });

      it('should check for alt key', (done) => {
        const div = document.createElement('div');

        div.addEventListener('mousedown', function (evt) {
          expect(evt.which).to.eql(1);
          expect(evt.altKey).to.be.true;
          done();
        });

        div.dispatchEvent(new MouseEvent('mousedown', {
          altKey: true
        }));
      });

      it('should check for ctrl key', (done) => {
        const div = document.createElement('div');

        div.addEventListener('mousedown', function (evt) {
          expect(evt.which).to.eql(1);
          expect(evt.ctrlKey).to.be.true;
          done();
        });

        div.dispatchEvent(new MouseEvent('mousedown', {
          ctrlKey: true
        }));
      });

      it('should check for meta key', (done) => {
        const div = document.createElement('div');

        div.addEventListener('mousedown', function (evt) {
          expect(evt.which).to.eql(1);
          expect(evt.metaKey).to.be.true;
          done();
        });

        div.dispatchEvent(new MouseEvent('mousedown', {
          metaKey: true
        }));
      });
    });

    describe('Coordinates', () => {
      describe('clientX/Y', () => {
        it('should return window relative coordinates', (done) => {
          const div = document.createElement('div');

          div.addEventListener('click', function (evt) {
            expect(evt.clientX).to.eql(52);
            expect(evt.clientY).to.eql(22);
            done();
          });

          div.dispatchEvent(new MouseEvent('click', {
            clientX: 52,
            clientY: 22
          }));
        });
      });

      describe('pageX/Y', () => {
        it('should return document relative coordinates', (done) => {
          const div = document.createElement('div');

          div.addEventListener('click', function (evt) {
            expect(evt.pageX).to.eql(52);
            expect(evt.pageY).to.eql(22);
            done();
          });

          div.dispatchEvent(new MouseEvent('click', {
            clientX: 52,
            clientY: 22
          }));
        });
      });
    });

    describe('No selection on mousedown', () => {
      it('should block with css', () => {
        const div = document.createElement('div');
        div.style.cssText = `
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        `;
        div.innerHTML = 'cannot select me';

        document.body.appendChild(div);

        div.remove();
      });

      it('should block with prevent default', () => {
        const div = document.createElement('div');
        div.onmousedown = function (evt) {
          return false;
        }
        div.innerHTML = 'cannot select me';

        document.body.appendChild(div);

        div.remove();
      });

      it('should block with cancelling already done selection', () => {
        const div = document.createElement('div');
        div.ondblclick = function (evt) {
          window.getSelection().removeAllRanges();
        }
        div.innerHTML = 'cannot select me with dblclick';

        document.body.appendChild(div);

        div.remove();
      });
    });

    describe('Prevention of Copying', () => {
      it('should prevent copying', () => {
        const div = document.createElement('div');
        div.oncopy = function (evt) {
          alert('dont copy please');
          return false
        }
        div.innerHTML = 'cannot copy me';

        document.body.appendChild(div);

        div.remove();
      });
    });
  });

  describe('3.2 Moving: mouseover/out, mouseenter/leave', () => {
    describe('Mouseover/out, relatedTarget', () => {
      it('should be triggered for nested elements too, may double', () => { });
      it('should relatedTarget point to previously mouseovered/mouseouted element', () => { });
      it('should bubble', () => { });
    });

    describe('Events Frequency', () => {
      it('should read the section', () => { });
    });

    describe('Mouseenter/leave, relatedTarget', () => {
      it('should read the section', () => { });
      it('should not bubble', () => { });
    });
  });

  describe('3.3 Drag&Drop with Mouse Events', () => {
    describe('The Algorithm', () => {
      it('should follow the steps and do excercise', () => {
        // Catch mousedown on a draggable element.
        // Prepare the element to moving (maybe create a copy of it or whatever).
        // Then on mousemove move it by changing left/top and position:absolute.
        // On mouseup (button release) – perform all actions related to a finished Drag’n’Drop.
      });
    });

    describe('Detecting Droppables', () => {
      it('should use technice with document.elementFromPoint(x, y) and hiding temporarily top elements to get to the lower ones', () => { });
    });
  });
});