describe('1 Document', () => {
  describe('1.1 Browser environment, specs', () => {
    describe('Host environment objects', () => {
      it('should be defined', () => {
        expect(window).toEqual(jasmine.any(Object));
        expect(document).toEqual(jasmine.any(Object));
        expect(window.document).toBe(document);
        expect(navigator).toEqual(jasmine.any(Object));
        expect(screen).toEqual(jasmine.any(Object));
        expect(location).toEqual(jasmine.any(Object));
        expect(frames).toEqual(jasmine.any(Object));
        expect(history).toEqual(jasmine.any(Object));
        expect(XMLHttpRequest).toEqual(jasmine.any(Function));
      });
    });

    describe('Root/Global/Window object', () => {
      it('should represent browser window and root/global', () => {
        expect(window).toEqual(jasmine.any(Object));
      });

      it('should check window height i.e.', () => {
        expect(window.innerHeight).toEqual(jasmine.any(Number));
      });
    });

    describe('DOM - Document Object Model', () => {
      it('should allow to inspect / change page contents, related events etc', () => {
        document.body.style.background = 'red';
        document.body.style.background = '';
      });
    });

    describe('BOM - Browser Object Model', () => {
      it('should allow to work with everything except the document i.e.', () => {
        expect(location.href).toEqual(jasmine.any(String));
      });
    });
  });

  describe('1.2 DOM tree', () => {
    it('should every html tag be an object, also text', () => { });
    it('should every element, space, new line be an object in DOM', () => { });
    it('should autocorrect malformed html (empty document with just text, gets wrapped with html->body)', () => { });
    it('should comments be also represented in DOM as objects', () => { });
    it('should be 12 node types, see: https://dom.spec.whatwg.org/#node', () => { });
  });

  describe('1.3 Walking the DOM', () => {
    describe('documentElement', () => {
      it('should point to html tag', () => {
        expect(document.documentElement.tagName).toEqual('HTML');
      });
    });

    describe('body', () => {
      it('should point to body tag', () => {
        expect(document.body.tagName).toEqual('BODY');
      });

      it('should be null if body is not yet known (script tag in head section i.e.)', () => { });
    });

    describe('head', () => {
      it('should point to head tag', () => {
        expect(document.head.tagName).toEqual('HEAD');
      });
    });

    describe('Nodes API', () => {
      describe('Children and first, last nodes', () => {
        let container;
        let div, text, ul;

        beforeEach(() => {
          container = document.createElement('div');
          container.innerHTML = `<div>begin</div>test<ul><li><b> info </b></li></ul>`;
          [div, text, ul] = container.childNodes;

        });

        describe('childNodes', () => {
          it('should get access to direct children, including text nodes', () => {
            expect(container.childNodes.length).toEqual(3);
            expect(div.tagName).toEqual('DIV');
            expect(text.nodeType).toEqual(3); // text type
            expect(text.textContent).toEqual('test');
            expect(ul.tagName).toEqual('UL');
          });
        });

        describe('firstChild', () => {
          it('should return first child', () => {
            expect(container.firstChild).toBe(container.childNodes[0]);
            expect(container.firstChild.tagName).toEqual('DIV');
            expect(container.firstChild.textContent).toEqual('begin');
          });
        });

        describe('lastChild', () => {
          it('should return last child', () => {
            expect(container.lastChild).toBe(container.childNodes[container.childNodes.length - 1]);
            expect(container.lastChild.tagName).toEqual('UL');
            expect(container.lastChild.textContent).toEqual(' info ');
          });
        });

        describe('hasChildNodes', () => {
          it('should return true if container has children', () => {
            expect(container.hasChildNodes()).toBe(true);
            expect(text.hasChildNodes()).toBe(false);
          });
        });

        describe('Read Only', () => {
          it('should DOM collections be read only, cannot modify nodes directly', () => { });
        });
      });

      describe('Siblings and the parent', () => {
        let container;
        let div, ul;

        beforeEach(() => {
          container = document.createElement('div');
          container.innerHTML = `<div>begin</div><ul><li></li></ul> text`;
          [div, ul, text] = container.childNodes;
        });

        describe('parentNode', () => {
          it('should return parent of given node', () => {
            expect(ul.parentNode).toBe(container);
          });
        });

        describe('nextSibling', () => {
          it('should return next sibling node', () => {
            expect(div.nextSibling).toBe(ul);
          });

          it('should return next sibling node which is text', () => {
            expect(ul.nextSibling).toBe(text);
          });
        });

        describe('previousSibling', () => {
          it('should return previous sibling node', () => {
            expect(ul.previousSibling).toBe(div);
          });
        });
      });
    });

    describe('Elements API', () => {
      describe('Children and first, last nodes', () => {
        let container;
        let div, ul;

        beforeEach(() => {
          container = document.createElement('div');
          container.innerHTML = `<div>begin</div>test<ul><li><b> info </b></li></ul>`;
          [div, text, ul] = container.childNodes;

        });

        describe('children', () => {
          it('should get access to direct element children', () => {
            expect(container.children.length).toEqual(2);
            expect(div.tagName).toEqual('DIV');
            expect(ul.tagName).toEqual('UL');
          });
        });

        describe('firstElementChild', () => {
          it('should return first child element', () => {
            expect(container.firstElementChild).toBe(container.children[0]);
            expect(container.firstElementChild.tagName).toEqual('DIV');
            expect(container.firstElementChild.textContent).toEqual('begin');
          });
        });

        describe('lastElementChild', () => {
          it('should return last child element', () => {
            expect(container.lastElementChild).toBe(container.children[container.children.length - 1]);
            expect(container.lastElementChild.tagName).toEqual('UL');
            expect(container.lastElementChild.textContent).toEqual(' info ');
          });
        });

        describe('Read Only', () => {
          it('should DOM collections be read only, cannot modify nodes directly', () => { });
        });
      });

      describe('Siblings and the parent', () => {
        let container;
        let div, ul;

        beforeEach(() => {
          container = document.createElement('div');
          container.innerHTML = `<div>begin</div><ul><li></li></ul> text`;
          [div, ul, text] = container.childNodes;
        });

        describe('parentElement', () => {
          it('should return parent of given element', () => {
            expect(ul.parentElement).toBe(container);
          });
        });

        describe('nextElementSibling', () => {
          it('should return next element sibling node', () => {
            expect(div.nextElementSibling).toBe(ul);
          });

          it('should return next element sibling or null', () => {
            expect(ul.nextElementSibling).toBe(null);
          });
        });

        describe('previousElementSibling', () => {
          it('should return previous element sibling node', () => {
            expect(ul.previousElementSibling).toBe(div);
          });
        });
      });
    });

    describe('More links: tables', () => {
      it('should table have own specific props, as other markup object too..', () => {
        const container = document.createElement('div');
        container.innerHTML = `
        <table id="table">
          <tr>
            <td>one</td><td>two</td>
          </tr>
          <tr>
            <td>three</td><td>four</td>
          </tr>
        </table>
        `;

        const table = container.firstElementChild;
        expect(table.tagName).toEqual('TABLE');

        expect(table.rows.length).toEqual(2);
        expect(table.rows[0].tagName).toEqual('TR');
        expect(table.rows[1].tagName).toEqual('TR');

        expect(table.tcaption).toBeUndefined();
        expect(table.tHead).toBeNull();
        expect(table.tFoot).toBeNull();

        expect(table.rows[0].cells.length).toEqual(2);
        // etc..
      });
    });
  });

  describe('1.4 Searching: getElement* and querySelector*', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'container';
      container.innerHTML = `
      <div id="begin">begin</div>
      <ul id="myList">
        <li id="item" class="cls">item</li>
      </ul>
      `;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    describe('document.getElementById', () => {
      it('should get element by id from whole document, has to be run on document object', () => {
        const el = document.getElementById('myList');
        expect(el.id).toEqual('myList');
      });
    });

    describe('elem.getElementsByTagName', () => {
      it('should get element by tag from give context', () => {
        const els = container.getElementsByTagName('div');
        expect(els.length).toEqual(1);
        expect(els[0].textContent).toEqual('begin');
      });
    });

    describe('elem.getElementsByClassName', () => {
      it('should get element by class name from given context', () => {
        const els = container.getElementsByClassName('cls');
        expect(els.length).toEqual(1);
        expect(els[0].tagName).toEqual('LI');
        expect(els[0].textContent).toEqual('item');
      });
    });

    describe('querySelectorAll', () => {
      it('should get all elements matching css selector', () => {
        const els = container.querySelectorAll('ul#myList > .cls');
        expect(els.length).toEqual(1);
        expect(els[0].tagName).toEqual('LI');
        expect(els[0].textContent).toEqual('item');
      });
    });

    describe('querySelector', () => {
      it('should get first element matching css selector', () => {
        const el = container.querySelector('ul#myList > .cls');
        expect(el.tagName).toEqual('LI');
        expect(el.textContent).toEqual('item');
      });
    });

    describe('el.matches(css)', () => {
      it('should return boolean if element matches given selector', () => {
        const el = container.querySelector('ul#myList > .cls');
        expect(el.matches('#item')).toBe(true);
      });
    });

    describe('el.closest(css)', () => {
      it('should return parent element matching given selector', () => {
        const el = container.querySelector('ul#myList > .cls');
        expect(el.closest('#container')).toBe(container);
        expect(el.closest('.cls')).toBe(el); // matches itself too, then goes up the tree
        expect(el.closest('#doesnotexist')).toBeNull();
      });
    });

    describe('el.contains(elB)', () => {
      it('should return boolean if element contains given other element', () => {
        const ul = container.querySelector('#myList');
        const li = container.querySelector('.cls');
        expect(ul.contains(li)).toBe(true);
      });
    });
  });

  describe('1.5 Node properties: type, tag and contents', () => {
    describe('DOM node classes', () => {
      it('should behave...', () => {
        
      });
    });
  });
});