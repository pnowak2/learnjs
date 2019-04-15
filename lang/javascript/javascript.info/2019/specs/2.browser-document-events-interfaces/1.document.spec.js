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
        expect(window).toEqual(global);
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
          container.innerHTML = `<div>begin</div>test<ul><li><b> info </b></li></ul><!-- comment -->`;
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
      it('should each DOM element belong to specific class with own properties (input, anchor, etc)', () => { });

      describe('EventTarget', () => {
        it('should be root of all DOM hierarchy elements', () => {
          const div = document.createElement('div');
          expect(div).toEqual(jasmine.any(EventTarget));
        });

        it('should provide events support', () => {
          expect(EventTarget.prototype.addEventListener).toEqual(jasmine.any(Function));
          expect(EventTarget.prototype.dispatchEvent).toEqual(jasmine.any(Function));
          expect(EventTarget.prototype.removeEventListener).toEqual(jasmine.any(Function));
        });
      });

      describe('Node', () => {
        it('should be abstract class, root of all DOM hierarchy elements', () => {
          const node = document.createTextNode('test');
          expect(node).toEqual(jasmine.any(EventTarget));
          expect(Node.__proto__).toEqual(EventTarget);
          expect(Node.prototype.__proto__).toEqual(EventTarget.prototype);
        });

        it('should provide node traversal methods', () => {
          // commented, its interface, thus illegal in js
          // expect(Node.prototype.childNodes)
          // expect(Node.prototype.parentNode)
          // expect(Node.prototype.nextSibling)
        });
      });

      describe('Text', () => {
        it('should be base class for all text nodes', () => {
          const text = document.createTextNode('test');
          expect(text).toEqual(jasmine.any(EventTarget));
          expect(Text.__proto__).toEqual(CharacterData);
          expect(Text.prototype.__proto__).toEqual(CharacterData.prototype);

          expect(CharacterData.__proto__).toEqual(Node);
        });

        it('should provide specific api', () => {
          // expect(Text.prototype.wholeText);
        });
      });

      describe('Comment', () => {
        it('should be base class for all comment nodes', () => {
          const comment = document.createComment('cmt');
          expect(comment).toEqual(jasmine.any(EventTarget));
          expect(Comment.__proto__).toEqual(CharacterData);
          expect(Comment.prototype.__proto__).toEqual(CharacterData.prototype);

          expect(CharacterData.__proto__).toEqual(Node);
        });
      });

      describe('Element', () => {
        it('should be base class for all elements', () => {
          const element = document.createElement('test');
          expect(element).toEqual(jasmine.any(EventTarget));
          expect(Element.__proto__).toEqual(Node);
          expect(Element.prototype.__proto__).toEqual(Node.prototype);
        });

        it('should provide specific api', () => {
          expect(Element.prototype.getElementsByTagName);
          expect(Element.prototype.querySelector);
        });
      });

      describe('HTMLElement', () => {
        it('should be base class for all elements', () => {
          const element = document.createElement('div');
          expect(element).toEqual(jasmine.any(EventTarget));
          expect(HTMLElement.__proto__).toEqual(Element);
          expect(HTMLElement.prototype.__proto__).toEqual(Element.prototype);
        });

        it('should provide specific api', () => {
          // expect(HTMLElement.prototype.hidden);
          // expect(HTMLElement.prototype.accessKey);
        });
      });

      describe('HTMLInputElement', () => {
        it('should be base class for all elements', () => {
          const element = document.createElement('input');
          expect(element).toEqual(jasmine.any(EventTarget));
          expect(HTMLInputElement.__proto__).toEqual(HTMLElement);
          expect(HTMLInputElement.prototype.__proto__).toEqual(HTMLElement.prototype);
        });

        it('should provide specific api', () => {
          // expect(HTMLInputElement.prototype.required);
          // expect(HTMLInputElement.prototype.value);
        });
      });
    });

    describe('The nodeType property', () => {
      it('should text node contain proper value', () => {
        const text = document.createTextNode('text');

        expect(text.nodeType).toEqual(3);
        expect(text instanceof Text).toBe(true);
      });

      it('should element node contain proper value', () => {
        const div = document.createElement('div');

        expect(div.nodeType).toEqual(1);
        expect(div instanceof HTMLElement).toBe(true);
      });

      it('should document node contain proper value', () => {
        expect(document.nodeType).toEqual(9);
        expect(document instanceof Document).toBe(true);
      });
    });

    describe('nodeName', () => {
      it('should give name of the node, not neccessarily an element', () => {
        const text = document.createTextNode('text');
        const div = document.createElement('div');

        expect(text.nodeName).toEqual('#text');
        expect(div.nodeName).toEqual('DIV');
      });
    });

    describe('tagName', () => {
      it('should give name of the element, not for node', () => {
        const text = document.createTextNode('text');
        const div = document.createElement('div');

        expect(text.tagName).toBeUndefined();
        expect(div.tagName).toEqual('DIV');
      });
    });

    describe('innerHTML: the contents for elements', () => {
      it('should get inner html contents as string', () => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'hello';
        div.appendChild(p);

        expect(div.innerHTML).toEqual('<p>hello</p>');
      });

      it('should set inner html contents as string', () => {
        const div = document.createElement('div');
        div.innerHTML = '<p><a id="lnk">link</a></p>';

        expect(div.querySelector('#lnk')).toEqual(jasmine.any(HTMLElement));
      });
    });

    describe('outerHTML: The full HTML of the element. A write operation into elem.outerHTML does not touch elem itself. Instead it gets replaced with the new HTML in the outer context.', () => {
      it('should get inner html contents as string', () => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'hello';
        div.appendChild(p);

        expect(div.outerHTML).toEqual('<div><p>hello</p></div>');
      });

      it('should set outer html contents as string, does not change element!, replaces it as whole, leaving old one still detached and with old content', () => {
        const container = document.createElement('div');
        const div = document.createElement('div');
        container.appendChild(div);

        div.outerHTML = '<p><b>hi</b></p>';

        expect(div.outerHTML).toEqual('<div></div>');
        expect(div.innerHTML).toEqual('');
      });
    });

    describe('nodeValue, data', () => {
      it('should read contents of non-element nodes like text, comments', () => {
        const container = document.createElement('div');
        container.innerHTML = 'text <p> par    </p><!-- comment -->';

        expect(container.firstChild.nodeValue).toEqual('text ');
        expect(container.childNodes[1].nodeValue).toBeNull();
        expect(container.lastChild.nodeValue).toEqual(' comment ');

        expect(container.firstChild.data).toEqual('text ');
        expect(container.childNodes[1].data).toBeUndefined(); // small difference
        expect(container.lastChild.data).toEqual(' comment ');
      });
    });

    describe('textContent', () => {
      it('should provide access to text without any tags', () => {
        const container = document.createElement('div');
        container.innerHTML = 'text <p> par    b</p><!-- comment -->';

        expect(container.textContent).toEqual('text  par    b');
      });

      it('should provide safe way of injecting text', () => {
        const container = document.createElement('div');
        container.innerHTML = 'text <p id="p"> par    b</p><!-- comment -->';
        const p = container.querySelector('#p');

        p.textContent = 'siema bolek';

        expect(container.textContent).toEqual('text siema bolek');
      });
    });

    describe('The "hidden" property', () => {
      it('should specify whether element is visible or not', () => {
        const container = document.createElement('div');
        const div = document.createElement('div');

        container.appendChild(div);
        div.hidden = true;

        expect(container.querySelector("[hidden]")).not.toBeNull();
      });
    });
  });

  describe('1.6 Attributes and properties', () => {
    describe('DOM properties / attributes', () => {
      it('should keep in sync some markup attributes with DOM object properties', () => { });
    });

    describe('Attributes manipulation', () => {
      describe('elem.hasAttribute(name)', () => {
        it('should check if attribute is set on element', () => {
          const container = document.createElement('div');
          container.innerHTML = '<input id="el" type="text" value="test" />';
          const el = container.querySelector('#el');

          expect(el.hasAttribute('type')).toBe(true);
        });
      });

      describe('elem.getAttribute(name)', () => {
        it('should return attribute on element', () => {
          const container = document.createElement('div');
          container.innerHTML = '<input id="el" type="text" value="test" />';
          const el = container.querySelector('#el');

          expect(el.getAttribute('type')).toEqual('text');
        });
      });

      describe('elem.setAttribute(name)', () => {
        it('should set attribute on element', () => {
          const container = document.createElement('div');
          container.innerHTML = '<input id="el" type="text" value="test" />';
          const el = container.querySelector('#el');

          el.setAttribute('title', 'hello');

          expect(el.getAttribute('title')).toEqual('hello');
          expect(container.innerHTML).toEqual('<input id="el" type="text" value="test" title="hello">');
        });
      });

      describe('elem.removeAttribute(name)', () => {
        it('should remove attribute on element', () => {
          const container = document.createElement('div');
          container.innerHTML = '<input id="el" type="text" value="test" />';
          const el = container.querySelector('#el');

          expect(el.getAttribute('type')).toEqual('text');

          el.removeAttribute('type');

          expect(el.getAttribute('type')).toBeNull();
          expect(container.innerHTML).toEqual('<input id="el" value="test">');

        });
      });

      describe('elem.attributes', () => {
        it('should get iterable with attributes of element', () => {
          const container = document.createElement('div');
          container.innerHTML = '<input id="el" type="text" value="test" />';
          const el = container.querySelector('#el');

          expect(el.attributes.length).toEqual(3);
          expect([...el.attributes].map(node => node.name)).toEqual(['id', 'type', 'value']);
        });
      });
    });

    describe('Non-standard attributes, dataset', () => {
      it('should add non standard attribute and then access it with dom api', () => {
        const container = document.createElement('div');
        const div = document.createElement('div');
        div.setAttribute('show-info', 'name');
        container.append(div);


        const infos = container.querySelectorAll('[show-info]');
        const result = [...infos].map(a => a.getAttribute('show-info'));

        expect(result).toEqual(['name']);
      });

      it('should read data- attributes', () => {
        const container = document.createElement('div');
        container.innerHTML = '<div id="dif" data-show-info="hi"></div>';
        const info = container.querySelector('#dif');

        expect(info.dataset.showInfo).toEqual('hi');
      });

      it('should write data- attributes', () => {
        const container = document.createElement('div');
        container.innerHTML = '<div id="dif"></div>';
        const info = container.querySelector('#dif');

        expect(info.dataset.showInfo).toBeUndefined();

        info.dataset.showInfo = 'boo!';

        expect(container.innerHTML).toEqual('<div id="dif" data-show-info="boo!"></div>');
      });
    });
  });

  describe('1.7 Modifying the document', () => {
    describe('Creating an element', () => {
      describe('document.createElement(tag)', () => {
        it('should create element with given tag name', () => {
          const div = document.createElement('div');
          expect(div.tagName).toEqual('DIV');
        });
      });

      describe('document.createTextNode(tag)', () => {
        it('should create text node with given text', () => {
          const text = document.createTextNode('here i am');
          expect(text.nodeType).toEqual(3);
        });
      });
    });

    describe('Insertion methods', () => {
      describe('el.appendChild(node)', () => {
        it('should append node as last child', () => {
          const container = document.createElement('div');
          container.innerHTML = '<ul><li>1</li><li>2</li></ul>';
          const ul = container.firstElementChild;

          const child = document.createElement('li');
          child.textContent = 3;

          ul.appendChild(child);

          expect(container.innerHTML).toEqual('<ul><li>1</li><li>2</li><li>3</li></ul>');
        });
      });

      describe('el.insertBefore(node, nextSibling)', () => {
        it('should insert node before given child', () => {
          const container = document.createElement('div');
          container.innerHTML = '<ul><li>1</li><li>2</li></ul>';
          const ul = container.firstElementChild;

          const child = document.createElement('li');
          child.textContent = 3;

          ul.insertBefore(child, ul.firstElementChild);

          expect(container.innerHTML).toEqual('<ul><li>3</li><li>1</li><li>2</li></ul>');
        });
      });

      describe('el.replaceChild(node, oldChild)', () => {
        it('should replace child with another node', () => {
          const container = document.createElement('div');
          container.innerHTML = '<ul><li>1</li><li>2</li></ul>';
          const ul = container.firstElementChild;

          const child = document.createElement('li');
          child.textContent = 3;

          ul.replaceChild(child, ul.firstElementChild);

          expect(container.innerHTML).toEqual('<ul><li>3</li><li>2</li></ul>');
        });
      });

      describe('node.append(...nodes or strings)', () => {
        it('should append node at the end', () => {
          const container = document.createElement('div');
          container.innerHTML = '<span>a</span>';
          const child = document.createElement('p');
          child.textContent = 3;

          container.append(child);

          expect(container.innerHTML).toEqual('<span>a</span><p>3</p>');
        });

        it('should append string at the end', () => {
          const container = document.createElement('div');
          container.innerHTML = '<span>a</span>';

          container.append('hejo');

          expect(container.innerHTML).toEqual('<span>a</span>hejo');
        });
      });

      describe('node.prepend(...nodes or strings)', () => {
        it('should prepend node at the end', () => {
          const container = document.createElement('div');
          container.innerHTML = '<span>a</span>';
          const child = document.createElement('p');
          child.textContent = 3;

          container.prepend(child)

          expect(container.innerHTML).toEqual('<p>3</p><span>a</span>');
        });

        it('should prepend string at the end', () => {
          const container = document.createElement('div');
          container.innerHTML = '<span>a</span>';

          container.prepend('hejo')

          expect(container.innerHTML).toEqual('hejo<span>a</span>');
        });
      });

      describe('node.before(...nodes or strings)', () => {
        it('should add before node another node', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          const child = document.createElement('p');
          child.textContent = 3;

          a.before(child);

          expect(container.innerHTML).toEqual('<p>3</p><a>link</a>');
        });

        it('should add before node a string', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          a.before('test')

          expect(container.innerHTML).toEqual('test<a>link</a>');
        });
      });

      describe('node.after(...nodes or strings)', () => {
        it('should add after node another node', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          const child = document.createElement('p');
          child.textContent = 3;

          a.after(child)

          expect(container.innerHTML).toEqual('<a>link</a><p>3</p>');
        });

        it('should add after node a string', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          a.after('test');

          expect(container.innerHTML).toEqual('<a>link</a>test');
        });
      });

      describe('node.replaceWith(...nodes or strings)', () => {
        it('should replace node with another node', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          const child = document.createElement('p');
          child.textContent = 3;

          a.replaceWith(child);

          expect(container.innerHTML).toEqual('<p>3</p>');
        });

        it('should replace node with string', () => {
          const container = document.createElement('div');
          container.innerHTML = '<a>link</a>';
          const a = container.querySelector('a');

          a.replaceWith('test')

          expect(container.outerHTML).toEqual('<div>test</div>');
        });
      });

      describe('elem.insertAdjacentHTML / Text / Element', () => {
        it('should insert "beforebegin"', () => {
          const container = document.createElement('div');
          container.innerHTML = "<a>link</a>"
          const a = container.querySelector('a');

          a.insertAdjacentHTML("beforebegin", '<p>test</p>');

          expect(container.innerHTML).toEqual('<p>test</p><a>link</a>');
        });

        it('should insert "afterbegin"', () => {
          const container = document.createElement('div');
          container.innerHTML = "<a>link</a>"
          const a = container.querySelector('a');

          a.insertAdjacentHTML("afterbegin", '<p>test</p>');

          expect(container.innerHTML).toEqual('<a><p>test</p>link</a>');
        });

        it('should insert "beforeend"', () => {
          const container = document.createElement('div');
          container.innerHTML = "<a>link</a>"
          const a = container.querySelector('a');

          a.insertAdjacentHTML("beforeend", '<p>test</p>');

          expect(container.innerHTML).toEqual('<a>link<p>test</p></a>');
        });

        it('should insert "afterend"', () => {
          const container = document.createElement('div');
          container.innerHTML = "<a>link</a>"
          const a = container.querySelector('a');

          a.insertAdjacentHTML("afterend", '<p>test</p>');

          expect(container.innerHTML).toEqual('<a>link</a><p>test</p>');
        });
      });

      describe('Moving to another place does not require removing element', () => {
        it('should prove with example', () => {
          const container = document.createElement('div');
          container.insertAdjacentHTML('afterbegin', '<p id="one">1</p><p id="two">2</p>')
          const one = container.querySelector('#one');
          const two = container.querySelector('#two');

          // one.appendChild(two); // works too
          // one.append(container.removeChild(two)); // works too
          one.append(two);

          expect(container.innerHTML).toEqual('<p id="one">1<p id="two">2</p></p>')
        });
      });
    });

    describe('Cloning nodes: cloneNode', () => {
      it('should make shallow clone', () => {
        const container = document.createElement('div');
        container.innerHTML = '<p>test</p>';

        const clone = container.cloneNode(false);

        expect(clone.outerHTML).toEqual('<div></div>');
      });

      it('should make deep clone', () => {
        const container = document.createElement('div');
        container.innerHTML = '<p>test</p>';

        const clone = container.cloneNode(true);

        expect(clone.outerHTML).toEqual('<div><p>test</p></div>');
      });
    });

    describe('DocumentFragment special Node', () => {
      it('should serve as wrapper to pass group of nodes', () => {
        const fragment = new DocumentFragment();
        fragment.append(document.createElement('div'));
        fragment.append(document.createElement('a'));

        const span = document.createElement('span');
        span.appendChild(fragment);

        expect(span.outerHTML).toEqual('<span><div></div><a></a></span>');
      });
    });

    describe('Removal methods', () => {
      describe('elem.removeChild(node)', () => {
        it('should remove child from parent', () => {
          const container = document.createElement('div');
          container.insertAdjacentHTML('afterbegin', '<p>test</p>')
          const p = container.querySelector('p');

          expect(container.innerHTML).toEqual('<p>test</p>');

          container.removeChild(p);

          expect(container.innerHTML).toEqual('');
        });
      });

      describe('elem.remove()', () => {
        it('should remove self from tree', () => {
          const container = document.createElement('div');
          container.insertAdjacentHTML('afterbegin', '<p>test</p>')
          const p = container.querySelector('p');

          expect(container.innerHTML).toEqual('<p>test</p>');

          p.remove();

          expect(container.innerHTML).toEqual('');
        });
      });
    });
  });

  describe('1.8 Styles and Classes', () => {
    describe('className', () => {
      it('should access/modify class attribute/property, wiping out previous value', () => {
        const div = document.createElement('div');
        div.className = 'my-class';

        expect(div.outerHTML).toEqual('<div class="my-class"></div>');
      });
    });

    describe('classList', () => {
      it('should allow to get list of classes', () => {
        const div = document.createElement('div');
        div.className = 'one two three';

        expect(div.classList.length).toEqual(3);
        expect(div.classList[0]).toEqual('one');
        expect(div.classList[1]).toEqual('two');
        expect(div.classList[2]).toEqual('three');
      });

      it('should allow to add new class', () => {
        const div = document.createElement('div');
        div.className = 'one';

        expect(div.classList.length).toEqual(1);

        div.classList.add('two');

        expect(div.classList.length).toEqual(2);
      });

      it('should allow to remove class', () => {
        const div = document.createElement('div');
        div.className = 'one two';

        expect(div.classList.length).toEqual(2);

        div.classList.remove('two');

        expect(div.classList.length).toEqual(1);
      });

      it('should allow to toggle class', () => {
        const div = document.createElement('div');
        div.className = 'one';

        expect(div.classList.length).toEqual(1);

        div.classList.toggle('two');
        expect(div.classList.length).toEqual(2);

        div.classList.toggle('two');
        expect(div.classList.length).toEqual(1);
      });
    });

    describe('Element style', () => {
      it('should access any entry in style="" statement', () => {
        const container = document.createElement('div');
        container.insertAdjacentHTML('afterbegin', '<div id="child" style="color: red; width: 100px">test</div>');
        const child = container.querySelector('#child');

        expect(child.style.color).toEqual('red');
        expect(child.style.width).toEqual('100px');
      });

      it('should modify/addany style on dom element', () => {
        const div = document.createElement('div');
        div.style.color = 'blue';

        expect(div.outerHTML).toEqual('<div style="color: blue;"></div>');
      });
    });

    describe('Resetting the style property', () => {
      it('should remove property do default state by setting empty string', () => {
        const div = document.createElement('div');
        div.style.display = 'none';

        expect(div.outerHTML).toEqual('<div style="display: none;"></div>');

        div.style.display = '';

        expect(div.outerHTML).toEqual('<div style=""></div>');
      });
    });

    describe('Apply css styles with style.cssText', () => {
      it('should apply several rules at once, wipes out all existing styles', () => {
        const div = document.createElement('div');
        div.style.cssText = `
          display: none;
          float: left;
        `;

        expect(div.outerHTML).toEqual('<div style="display: none; float: left;"></div>');

      });
    });

    describe('Mind the units', () => {
      it('should provide units to style properties', () => {
        const div = document.createElement('div');
        div.style.height = '10px';

        expect(div.outerHTML).toEqual('<div style="height: 10px;"></div>');
      });
    });

    describe('Computed styles: getComputedStyle()', () => {
      let style;
      let div;

      beforeEach(() => {
        style = document.createElement('style');
        style.textContent = '#myDiv { width: auto; font-size: 2rem; } #myDiv::before { padding-left: 8px; }';
        div = document.createElement('div');
        div.id = 'myDiv';


        document.body.appendChild(style);
        document.body.appendChild(div);
      });

      afterEach(() => {
        document.body.removeChild(style);
        document.body.removeChild(div);
      });

      it('should not depend on style property of element, it depends on style attribute only', () => {
        expect(div.style.width).toEqual('');
        expect(div.style.fontSize).toEqual('');
      });

      it('should get computed (all css rules, inheritance applied) value, resolved to fixed units', () => {
        expect(getComputedStyle(div).width).toEqual('767px');
        expect(getComputedStyle(div).fontSize).toEqual('32px');
      });

      it('should access pseudo element', () => {
        expect(getComputedStyle(div, "::before").paddingLeft).toEqual('8px');

      });
    });
  });

  describe('1.9 Element size and scrolling', () => {
    let container, box, style;

    beforeEach(() => {
      // box with width, height, content and scroll
      container = document.createElement('div');
      container.style.position = 'relative';

      box = document.createElement('div');
      box.id = 'example';
      box.textContent = `
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam exercitationem iure aliquid rerum doloribus, deleniti maxime aspernatur quidem adipisci facilis pariatur dicta! Possimus illum autem odio commodi recusandae doloremque minus.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam exercitationem iure aliquid rerum doloribus, deleniti maxime aspernatur quidem adipisci facilis pariatur dicta! Possimus illum autem odio commodi recusandae doloremque minus.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam exercitationem iure aliquid rerum doloribus, deleniti maxime aspernatur quidem adipisci facilis pariatur dicta! Possimus illum autem odio commodi recusandae doloremque minus.
      `;

      style = document.createElement('style');
      style.textContent = `
        #example {
          position: absolute;
          top: 80px;
          left: 20px;

          width: 300px;
          height: 200px;
          border: 25px solid #E8C48F;
          padding: 20px;
          overflow: auto;
        }
      `;

      document.body.appendChild(style);
      container.append(box);
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(style);
      container.removeChild(box);
      document.body.removeChild(container);
    });

    describe('Geometry', () => {
      describe('offsetParent', () => {
        it('should return closest parent which is css-positioned (position absolute, relative, fixed or sticky)', () => {
          expect(box.offsetParent).toBe(container);
        });

        it('should return null for hidden', () => {
          box.hidden = true;
          expect(box.offsetParent).toBeNull();
        });

        it('should return null for position fixed', () => {
          box.style.position = 'fixed';
          expect(box.offsetParent).toBeNull();
        });

        it('should return null in case of body', () => {
          expect(document.body.offsetParent).toBeNull();
        });
      });

      describe('offsetLeft', () => {
        it('should return x/y coordinates relative to its offset parent upper left corner', () => {
          expect(box.offsetLeft).toEqual(20);
        });

        it('should return zero for hidden', () => {
          box.hidden = true;
          expect(box.offsetLeft).toEqual(0);
        });
      });

      describe('offsetTop', () => {
        it('should return x/y coordinates relative to its offset parent upper top corner', () => {
          expect(box.offsetTop).toEqual(80);
        });

        it('should return zero for hidden', () => {
          box.hidden = true;
          expect(box.offsetTop).toEqual(0);
        });
      });

      describe('offsetWidth', () => {
        it('should return the outer width (content, padding, border, scrolls) with default box sizing', () => {
          expect(box.offsetWidth).toEqual(390);
          // for default box sizing, only contents is 300px, padding and border add on top of it making it bigger
          // width (300) + padding left (20) + padding right (20) + border left (25) + border right (25)
        });

        it('should return the outer width (content, padding, border, scrolls) with border-box sizing', () => {
          box.style.boxSizing = 'border-box';
          expect(box.offsetWidth).toEqual(300);
          // for border-box sizing, the total width has to be 300 as given in css (contents is then smaller, cause paddings and margins take some place taking from contents)
          // width (300)
        });

        it('should compare to computed style with default box sizing (scroll takes some width, but not in Firefox)', () => {
          expect(getComputedStyle(box).width).toEqual('283px');
        });

        it('should compare to computed style with border box sizing', () => {
          box.style.boxSizing = 'border-box';
          expect(getComputedStyle(box).width).toEqual('300px');
        });
      });

      describe('offsetHeight', () => {
        it('should return the outer height (content, padding, border, scrolls) with default box sizing', () => {
          expect(box.offsetHeight).toEqual(290);
          // for default box sizing, only contents is 300px, padding and border add on top of it making it bigger
          // height (200) + padding top (20) + padding bottom (20) + border top (25) + border bottom (25)
        });

        it('should return the outer height (content, padding, border, scrolls) with border-box sizing', () => {
          box.style.boxSizing = 'border-box';
          expect(box.offsetHeight).toEqual(200);
          // for border-box sizing, the total height has to be 200 as given in css (contents is then smaller, cause paddings and margins take some place taking from contents)
          // height (200)
        });

        it('should compare to computed style with default box sizing (scroll takes some width, but not in Firefox)', () => {
          expect(getComputedStyle(box).height).toEqual('200px');
        });

        it('should compare to computed style with border box sizing', () => {
          box.style.boxSizing = 'border-box';
          expect(getComputedStyle(box).height).toEqual('200px');
        });
      });
    });
  });
});