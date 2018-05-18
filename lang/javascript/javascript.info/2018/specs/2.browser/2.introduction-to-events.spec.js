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
        
        div.addEventListener('click', function(e) {
          expect(e.type).to.eql('click');
          done();
        });   
        
        div.dispatchEvent(evt);
      });

      it('should get event.currentTarget which is element that handled the event, equals to this', (done) => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');
        
        div.addEventListener('click', function(e) {
          expect(e.currentTarget).to.eql(div);
          expect(e.currentTarget).to.eql(this);
          done();
        });   
        
        div.dispatchEvent(evt);
      });

      it('should get event.clientX, event.clientY which are window related coordinates of mouse pointer', (done) => {
        const div = document.createElement('div');
        const evt = new MouseEvent('click');
        
        div.addEventListener('click', function(e) {
          expect(e.clientX).to.be.a('number');
          expect(e.clientY).to.be.a('number');
          done();
        });   
        
        div.dispatchEvent(evt);
      });
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