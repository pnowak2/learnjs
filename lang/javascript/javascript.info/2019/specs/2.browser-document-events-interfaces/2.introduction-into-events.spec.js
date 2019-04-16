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
    it('should behave...', () => {
      
    });
  });
});