var expect = require('chai').expect;
var sinon = require('sinon');

describe('4. Forms, Controls', () => {
  describe('4.1 Form Properties and Methods', function () {
    describe('Form and Elements', () => {
      let div;

      beforeEach(() => {
        div = document.createElement('div');
        div.innerHTML = `
       <form name="my" id="myForm">
         <input name="one" value="1">
         <input name="two" value="2">

         <input type="radio" name="age" value="10">
         <input type="radio" name="age" value="20">

         <fieldset name="userFields">
           <legend>info</legend>
           <input name="login" type="text" value="pnowak">
         </fieldset>
       </form>
       `;

        document.body.appendChild(div);
      });

      afterEach(() => {
        div.remove();
      });

      describe('Form', () => {
        it('should check document.forms.length', () => {
          expect(document.forms.length).to.eql(1);
        });

        it('should get form by name', () => {
          expect(document.forms.my).to.be.defined;
        });

        it('should get form by index', () => {
          expect(document.forms.myForm).to.be.defined;
        });

        it('should get form by index', () => {
          expect(document.forms[0]).to.be.defined;
          expect(document.forms[0]).to.eql(document.forms.my);
        });
      });


      describe('Elements', () => {
        it('should access elements of the form', () => {
          const form = document.forms.my;
          expect(form.elements.length).to.eql(6);
        });

        it('should access element of the form', () => {
          const form = document.forms.my;
          expect(form.elements.one.value).to.eql('1');
        });

        it('should handle multiple elements with same name', () => {
          const form = document.forms.my;
          expect(form.elements.age.length).to.eql(2);
          expect(form.elements.age[1].value).to.eql('20');
        });

        it('should use shorthand notation to get element directly from form', () => {
          const form = document.forms.my;
          expect(form.one.value).to.eql('1');
          expect(form.elements.one).to.eql(form.one);
        });
      });

      describe('Fieldsets as Subforms', () => {
        it('should access fieldset', () => {
          const form = document.forms.my;
          expect(form.elements.userFields).to.be.defined;
        });

        it('should have own elements', () => {
          const fieldset = document.forms.my.userFields;
          expect(fieldset.elements.length).to.eql(1);
          expect(fieldset.elements.login.value).to.eql('pnowak');
        });

        it('should be same as reference directly from form', () => {
          const fieldset = document.forms.my.userFields;
          const form = document.forms.my;

          expect(fieldset.elements.login).to.eql(form.elements.login);
        });
      });

      describe('Backreference: element.form', () => {
        it('should any form element have reference to it', () => {
          const input = document.forms.my.elements.two;
          expect(input.form).to.eql(document.forms.my);
        });
      });
    });

    describe('Form Controls', () => {
      describe('Input and Textarea', () => {
        let div;

        beforeEach(() => {
          div = document.createElement('div');
          div.innerHTML = `
         <form name="my">
           <input name="firstName" value="peter">
           <input name="isOnline" type="checkbox" value="yes" checked/>
           <textarea name="txtArea">Description</textarea>
         </form>
         `;

          document.body.appendChild(div);
        });

        afterEach(() => {
          div.remove();
        });

        it('should access input value', () => {
          expect(document.forms.my.firstName.value).to.eql('peter');
        });

        it('should access textarea value', () => {
          expect(document.forms.my.txtArea.value).to.eql('Description');
        });

        it('should access checkbox checked property', () => {
          expect(document.forms.my.isOnline.checked).to.be.true;
        });
      });

      describe('Select and Option', () => {
        describe('Single Selection', () => {
          let div;

          beforeEach(() => {
            div = document.createElement('div');
            div.innerHTML = `
            <form name="single">
              <select name='numbers'>
                <option value='1'>One</option>
                <option value='2' selected>Two</option>
              </select>
            </form>
            `;

            document.body.appendChild(div);
          });

          afterEach(() => {
            div.remove();
          });

          it('should access select value', () => {
            expect(document.forms.single.numbers.value).to.eql('2');
          });

          it('should access selectedIndex', () => {
            expect(document.forms.single.numbers.selectedIndex).to.eql(1);
          });

          it('should access options collection', () => {
            const select = document.forms.single.numbers;
            expect(select.options.length).to.eql(2);
            expect(select.options[1].value).to.eql('2');
          });

          it('should change selectedIndex programmaticaly', () => {
            const select = document.forms.single.numbers;
            select.selectedIndex = 0;
            expect(select.value).to.eql('1');
          });

          it('should change select value programmaticaly', () => {
            const select = document.forms.single.numbers;
            select.value = '2';
            expect(select.options[0].selected).to.be.false;
            expect(select.options[1].selected).to.be.true;
          });

          it('should change selectedIndex by changing options', () => {
            const select = document.forms.single.numbers;
            select.options[0].selected = true;
            expect(select.value).to.eql('1');
          });

          it('should change option value by changing options', () => {
            const select = document.forms.single.numbers;
            select.options[1].value = 'buba';
            expect(select.value).to.eql('buba');
          });
        });

        describe('Multiple Selection', () => {
          let div;

          beforeEach(() => {
            div = document.createElement('div');
            div.innerHTML = `
            <form name="multi">
              <select name='numbers' multiple>
                <option value='1'>One</option>
                <option value='2' selected>Two</option>
                <option value='3' selected>Three</option>
                <option value='4'>Four</option>
                <option value='5' selected>Five</option>
              </select>
            </form>
            `;

            document.body.appendChild(div);
          });

          afterEach(() => {
            div.remove();
          });

          it('should access select value', () => {
            const selected = Array
              .from(document.forms.multi.numbers.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);

            expect(selected).to.eql(['2', '3', '5']);
          });

        });

        describe('New Option Api', () => {
          let div;

          beforeEach(() => {
            div = document.createElement('div');
            div.innerHTML = `
            <form name="single">
              <select name='numbers'>
                <option value='1'>One</option>
                <option value='2' selected>Two</option>
              </select>
            </form>
            `;

            document.body.appendChild(div);
          });

          afterEach(() => {
            div.remove();
          });

          it('should add new option programatticaly', () => {
            const options = document.forms.single.numbers.options;
            const option = new Option('Three', 3, true, true);
            options/* HTMLOptionsCollection */.add(option /* HTMLOptionElement */);
          });
        });
      });
    });
  });

  describe('4.2 Focusing: focus/blur', () => {
    describe('Focus - Element ready to accept data', () => {
      it('should listen on focus event (no bubbling)', (done) => {
        const div = document.createElement('div');
        div.onfocus = function (evt) {
          done();
        }

        div.dispatchEvent(new FocusEvent('focus'));
      });

      it('should user focus() method', () => {
        const div = document.createElement('div');
        div.tabIndex = 1;
        div.focus();
      });
    });

    describe('Blur - Element finished accepting data', () => {
      it('should listen on blur event (no bubbling)', (done) => {
        const div = document.createElement('div');
        div.onblur = function (evt) {
          done();
        }

        div.dispatchEvent(new FocusEvent('blur'));
      });

      it('should user blur() method', () => {
        const div = document.createElement('div');
        div.tabIndex = 1;
        div.blur();
      });
    });

    describe('Focusin', () => {
      it('should listen on focusin event (supports bubbling)', (done) => {
        const div = document.createElement('div');
        div.addEventListener('focusin', function (evt) {
          done();
        });

        div.dispatchEvent(new FocusEvent('focusin'));
      });
    });

    describe('Focusout', () => {
      it('should listen on focusout event (supports bubbling)', (done) => {
        const div = document.createElement('div');
        div.addEventListener('focusout', function (evt) {
          done();
        });

        div.dispatchEvent(new FocusEvent('focusout'));
      });
    });

    describe('Allow Focusing on Any element: tabindex', () => {
      it('should be guaranteed that focus works with buttin, input, select, a and so on', () => { });
      it('should other elements like table, div, span to be not focusable by default', () => { });
      it('should tabindex allow focus to work on any element', () => { });
      it('should tabindex="0" make the element last', () => { });
      it('should tabindex="-10" make the element ignored during Tab jumping', () => { });
    });
  });

  describe('4.3 Events: change, input, cut, copy, paste', () => {
    describe('Change', () => {
      it('should trigger when element has finished changing', () => {
        // does not work in test, but in case of input change is triggered when blur is done
        const input = document.createElement('change');

        input.addEventListener('change', function (evt) {

        });

        input.value = 'test';
        input.focus();
        input.value = 'other';
        input.blur();
      });
    });

    describe('Input', () => {
      it('should trigger when value is modified, by keyboard, speech, clipboard etc etc', () => {
        // does not work in test, but in case of input change is triggered when blur is done
        const input = document.createElement('input');

        input.addEventListener('input', function (evt) {

        });

        input.value = 'test';
        input.focus();
        input.value = 'other';
        input.blur();
      });
    });

    describe('Cut, Copy, Paste', () => {
      it('should call a handler in case of those and get clipboard details', () => {
        const input = document.createElement('input');
        input.oncopy = input.oncut = input.onpaste = function (evt /* ClipboardEvent */) {
          evt.clipboardData.getData('text/plain');
        }
      });
    });
  });

  describe('4.4 Form Submission: event and method submit', () => {
    describe('Event: submit', () => {
      it('should use input with type="submit"', () => { });
      it('should use input with type="image"', () => { });
      it('should know that submit() method does not call onsubmit event', () => {});
    });
  });
});


