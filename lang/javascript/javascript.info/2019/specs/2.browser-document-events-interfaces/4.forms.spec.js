describe('4 Forms', () => {
  describe('4.1 Form properties and methods', () => {
    let container;
    let form;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = `
        <form id="my" name="my">
          <input type="radio" name="age" checked value="10">
          <input type="radio" name="age" value="20">
 
          <input name="one" value="1">
          <input name="two" value="2">

          <select name="roles">
            <option value="u">user</option>
            <option selected value="a">admin</option>
          </select>

          <fieldset name="userFields">
            <legend>info</legend>
            <input name="login" value="nowapio" type="text">
          </fieldset>
        </form>
      `;
      form = container.querySelector('#my');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    describe('Navigation: form and elements', () => {
      describe('Forms', () => {
        it('should document have a form', () => {
          expect(Array.from(document.forms)).toEqual([form]);
        });

        it('should have one concrete form', () => {
          expect(document.forms[0]).toEqual(form);
        });

        it('should have one concrete form by name', () => {
          expect(document.forms.my).toEqual(form);
        });
      });

      describe('Elements', () => {
        it('should check elements', () => {
          expect(document.forms.my.elements.length).toEqual(7);
        });

        it('should check value of elememnts', () => {
          expect(document.forms.my.elements.one.value).toEqual('1');
          expect(document.forms.my.elements.two.value).toEqual('2');
        });

        it('should handle multiple elements with same name', () => {
          expect(document.forms.my.elements.age.length).toEqual(2);
          expect(document.forms.my.elements.age[0].value).toEqual('10');
        });
      });

      describe('Fieldsets', () => {
        it('should be defined in form', () => {
          expect(document.forms.my.userFields).toBeDefined();
        });

        it('should fieldset have elements', () => {
          expect(document.forms.my.userFields.elements.length).toEqual(1);
        });

        it('should ', () => {
          expect(document.forms.my.userFields.elements[0].value).toEqual('nowapio');
        });
      });

      describe('Backreference to Form', () => {
        it('should have element reference to form', () => {
          expect(document.forms.my.elements.one.form).toEqual(form);
        });
      });

      describe('Select and Option', () => {
        it('should have number of options inside select', () => {
          expect(document.forms.my.elements.roles.options.length).toEqual(2);
        });

        it('should have proper selected index', () => {
          expect(document.forms.my.elements.roles.selectedIndex).toEqual(1);
        });

        it('should have proper selected value', () => {
          const idx = document.forms.my.elements.roles.selectedIndex;
          expect(document.forms.my.elements.roles[idx].value).toEqual('a');
        });
      });
    });
  });

  describe('4.2 Focusing: focus/blur', () => {
    it('should use onfocus', (done) => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      input.addEventListener('focus', function(evt) {
        done();
      });

      input.focus();

      document.body.removeChild(input);
    });

    it('should use onblur', (done) => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      input.focus();
      
      input.addEventListener('blur', function(evt) {
        done();
      });

      input.blur();

      document.body.removeChild(input);
    });

    it('should make any element focusable, by adding tabindex', (done) => {
      const div = document.createElement('div');
      div.setAttribute('tabindex', '1');
      document.body.appendChild(div);

      div.addEventListener('blur', function(evt) {
        done();
      });

      div.focus();

      document.body.removeChild(div);
    });

    it('should use focusin, should bubble', (done) => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      input.addEventListener('focusin', function(evt) {
        done();
      });

      input.focus();

      document.body.removeChild(input);
    });

    it('should use focusout, should bubble', (done) => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      input.focus();
      
      input.addEventListener('focusout', function(evt) {
        done();
      });

      input.blur();

      document.body.removeChild(input);
    });
  });

  describe('4.3 Events: change, input, cut, copy, paste', () => {
    describe('Event: change', () => {
      it('should trigger when element finished changes', (done) => {
        const input = document.createElement('input');
        document.body.appendChild(input);

        input.addEventListener('change', function (evt) {
          done();
        });

        input.dispatchEvent(new Event('change', { bubbles: true }));

        document.body.removeChild(input);
      });
    });
    
    describe('Event: input', () => {
      it('should trigger when element finished changes, including paste events', (done) => {
        const input = document.createElement('input');
        document.body.appendChild(input);

        input.addEventListener('input', function (evt) {
          done();
        });

        input.dispatchEvent(new Event('input', { bubbles: true }));

        document.body.removeChild(input);
      });
    });

    describe('Event: copy/paste', () => {
      it('should trigger when copied/pasted', (done) => {
        const input = document.createElement('input');
        document.body.appendChild(input);

        input.addEventListener('copy', function (evt) {
          done();
        });
        input.addEventListener('paste', function (evt) {
          done();
        });

        input.dispatchEvent(new Event('copy', { bubbles: true }));
        input.dispatchEvent(new Event('paste', { bubbles: true }));

        document.body.removeChild(input);
      });
    });
  });
  
  describe('4.4 Form submission', () => {
   it('should submit form using submit method', () => {
     const form = document.createElement('form');
     form.submit();
   }); 
  });
});