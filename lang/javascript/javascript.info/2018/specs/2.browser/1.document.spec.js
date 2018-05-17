var expect = require('chai').expect;

describe('2. Document', () => {
  describe('1.1 BrowserEnvironment, Specs', function () {
    it('should read the section', function () { });
  });

  describe('1.2 DOM tree', function () {
    it('should read the section', function () { });

    // There are 12 node types. In practice we usually work with 4 of them:

    // document – the “entry point” into DOM.
    // element nodes – HTML-tags, the tree building blocks.
    // text nodes – contain text.
    // comments – sometimes we can put the information there, it won’t be shown, but JS can read it from the DOM.
  });

  describe('1.3 Walking the DOM', () => {
    describe('Document', () => {
      describe('document', () => {
        it('should be top most root to access everything elese', () => {
          expect(document).to.be.defined;
        });
      });

      describe('documentElement', () => {
        it('should point to HTML tag', () => {
          expect(document.documentElement.tagName).to.eql('HTML');
        });
      });

      describe('document.body', () => {
        it('should point to BODY tag', () => {
          expect(document.body.tagName).to.eql('BODY');
        });
      });

      describe('document.head', () => {
        it('should point to HEAD tag', () => {
          expect(document.head.tagName).to.eql('HEAD');
        });
      });
    });

    describe('Children', () => {
      describe('.childNodes', () => {
        it('should list all direct children including comments and other types, including text nodes', () => {
          expect(document.body.childNodes).to.be.defined;
        });
      });

      describe('.firstChild', () => {
        it('should get first child of childNodes', () => {
          expect(document.body.firstChild).to.equal(document.body.childNodes[0]);
        });
      });

      describe('.lastChild', () => {
        it('should get last child of childNodes', () => {
          expect(document.body.lastChild).to.equal(document.body.childNodes[document.body.childNodes.length - 1]);
        });
      });

      describe('.hasChildNodes()', () => {
        it('should check if element has any children', () => {
          expect(document.body.hasChildNodes()).to.be.true;
        });
      });
    });

    describe('DOM Collections', () => {
      it('should childNodes not be a collection, but we can convert to such', () => {
        expect(document.body.childNodes).not.to.be.an('array');
        expect(Array.from(document.body.childNodes)).to.be.an('array');
      });

      it('should be read-only', () => {
        // its not allowed
        // document.body.childNodes[i] = 
      });
    });

    describe('Siblings and The Parent', () => {
      it('should be nodes having the same parent (like head and body)', () => { });

      describe('.parentNode', () => {
        it('should give direct parent of the node', () => {
          expect(document.body.parentNode).to.eql(document.documentElement);
        });
      });

      describe('.nextSibling', () => {
        it('should give next sibling node', () => {
          expect(document.head.nextSibling).to.eql(document.body);
        });
      });

      describe('.previousSibling', () => {
        it('should give next sibling node', () => {
          expect(document.body.previousSibling).to.eql(document.head);
        });
      });
    });

    describe('Element Only Navigation', () => {
      describe('Children', () => {
        describe('.childNodes', () => {
          it('should list all direct children elements only', () => {
            expect(document.body.children).to.be.defined;
          });
        });

        describe('.firstElementChild', () => {
          it('should get first element child of children', () => {
            expect(document.body.firstElementChild).to.equal(document.body.children[0]);
          });
        });

        describe('.lastElementChild', () => {
          it('should get last element child of children', () => {
            expect(document.body.lastElementChild).to.equal(document.body.children[document.body.children.length - 1]);
          });
        });
      });

      describe('Siblings and The Parent', () => {
        it('should be elements having the same parent', () => { });

        describe('.parentElement', () => {
          it('should give direct parent element', () => {
            expect(document.body.parentElement).to.eql(document.documentElement);
          });

          it('should return document in case of parentNode', () => {
            expect(document.documentElement.parentNode).to.eql(document);
          });

          it('should return null in case of parentElement', () => {
            expect(document.documentElement.parentElement).to.be.null;
          });
        });

        describe('.nextElementSibling', () => {
          it('should give next sibling element', () => {
            expect(document.head.nextElementSibling).to.eql(document.body);
          });
        });

        describe('.previousElementSibling', () => {
          it('should give next sibling element', () => {
            expect(document.body.previousElementSibling).to.eql(document.head);
          });
        });
      });
    });

    describe('Tables and Its Own Properties', () => {
      let tbl, tr;
      beforeEach(() => {
        tbl = document.createElement('table');
        tr = document.createElement('tr');
        tbl.setAttribute('id', 'table');
        tbl.appendChild(tr);
        document.body.appendChild(tbl);
      });

      afterEach(() => {
        if (tbl) {
          tbl.remove();
        }
      });

      it('should have table related properties', () => {
        expect(table).to.have.property('rows');
        expect(table).to.have.property('caption');
        expect(table).to.have.property('tHead');
        expect(table).to.have.property('tFoot');
        expect(table).to.have.property('tBodies');
        expect(table.tbody).to.be.defined;
        expect(table).to.have.property('rows');
        expect(table.rows[0]).to.have.property('cells');
      });
    });
  });

  describe('1.4 Searching: getElement* and querySelector*', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = `
        <span id="myEl" class="myClass" name="myName">
          <div class="footer">
            <a class="link" href="#">Link</a> 
          </div>
        </span>`;
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container) {
        container.remove();
      }
    });

    describe('document.getElementById() or just id', () => {
      it('should use id global property if element with such id exists', () => {
        expect(window.myEl).to.be.defined;
      });

      it('should use getElementById()', () => {
        expect(document.getElementById('myEl')).not.to.be.null;
      });
    });

    describe('.getElementsByTagName()', () => {
      it('should get elements by its tag name, called in the context of any DOM element', () => {
        const result = container.getElementsByTagName('span');
        expect(result.length).to.eql(1);
        expect(result[0].getAttribute('id')).to.eql('myEl');
      });
    });

    describe('.getElementsByClassName()', () => {
      it('should get elements by its class name, called in the context of any DOM element', () => {
        const result = container.getElementsByClassName('myClass');
        expect(result.length).to.eql(1);
        expect(result[0].getAttribute('class')).to.eql('myClass');
      });
    });

    describe('document.getElementsByName()', () => {
      it('should get elements by its name, called in the context of any DOM element', () => {
        const result = document.getElementsByName('myName');
        expect(result.length).to.eql(1);
        expect(result[0].getAttribute('name')).to.eql('myName');
      });
    });

    describe('.querySelectorAll()', () => {
      it('should query for elements with selector inside element', () => {
        const result = container.querySelectorAll('.myClass');
        expect(result.length).to.eql(1);
        expect(result[0].getAttribute('class')).to.eql('myClass');
      });
    });

    describe('.querySelector()', () => {
      it('should query for first element with selector inside element', () => {
        const result = container.querySelector('.myClass');
        expect(result.getAttribute('class')).to.eql('myClass');
      });
    });

    describe('.matches()', () => {
      it('should check if elem matches css selector', () => {
        const result = container.querySelector('.myClass');
        expect(result.matches('span.myClass')).to.be.true;
      });
    });

    describe('.closest()', () => {
      it('should match closes parent in the hierarchy satisfying the query', () => {
        const result = container.querySelector('.link');
        expect(result.closest('.myClass').tagName).to.eql('SPAN');
      });
    });

    describe('.contains()', () => {
      it('should check if elem contains another element', () => {
        const myCmp = container.querySelector('.myClass');
        const link = container.querySelector('.link');
        expect(myCmp.contains(link)).to.be.true;
      });
    });

    describe('Live Collections', () => {
      it('should update collections live, works like live queries', () => {
        const result = container.querySelector('.myClass');
        expect(result.children.length).to.eql(1);

        let div = document.createElement('span');
        result.appendChild(div);

        expect(result.children.length).to.eql(2);
      });
    });
  });

  describe('1.5 Node Properties: type, tag and contents', () => {
    describe('DOM node classes', () => {
      it('should know inheritance hierarchy', () => {
        EventTarget, Node, Text, Element, Comment, HTMLElement, SVGElement, HTMLInputElement, HTMLBodyElement, HTMLAnchorElement
      });

      it('should be instance of certain class', () => {
        expect(document.body instanceof HTMLBodyElement).to.be.true;
        expect(document.body.constructor.name).to.eql('HTMLBodyElement');
      });
    });

    describe('The nodeType Property', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <span id="myEl" class="myClass" name="myName">
            <div class="footer">
              <a class="link" href="#">Link</a> 
              <!-- Hello comment -->
            </div>
          </span>`;
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should know base node types', () => {
        expect(Node.ELEMENT_NODE).to.eql(1);
        expect(Node.TEXT_NODE).to.eql(3);
        expect(Node.COMMENT_NODE).to.eql(8);
        expect(Node.DOCUMENT_NODE).to.eql(9);
      });

      it('should check for node types', () => {
        const footer = container.querySelector('.footer');
        const comment = footer.childNodes[3];
        const text = footer.childNodes[4];

        expect(footer.nodeType).to.eql(Node.ELEMENT_NODE);
        expect(comment.nodeType).to.eql(Node.COMMENT_NODE);
        expect(text.nodeType).to.eql(Node.TEXT_NODE);
        expect(comment.textContent).to.eql(' Hello comment ');
      });
    });

    describe('nodeName and tagName properties', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <span id="myEl" class="myClass" name="myName">
            <div class="footer">
              <a class="link" href="#">Link</a> 
              <!-- Hello comment -->
            </div>
          </span>`;
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should nodeName be specific to any Node', () => {
        expect(document.nodeName).to.eql('#document');
        expect(document.tagName).to.eql(undefined);
      });

      it('should tagName be specific to any Element', () => {
        expect(container.nodeName).to.eql('DIV');
        expect(container.tagName).to.eql('DIV');
      });
    });

    describe('innerHTML, the contents', () => {
      it('should read inner html contents', () => {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.setAttribute('class', 'myClass');
        p.innerText = 'hello';
        div.appendChild(p);

        expect(div.innerHTML).to.eql('<p class="myClass">hello</p>');
      });

      it('should write inner html as contents', () => {
        let div = document.createElement('div');
        div.innerHTML = '<p class="myClass">hello</p>';
      });
    });

    describe('outerHTML, the contents', () => {
      it('should read inner html contents', () => {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.setAttribute('class', 'myClass');
        p.innerText = 'hello';
        div.appendChild(p);

        expect(div.outerHTML).to.eql('<div><p class="myClass">hello</p></div>');
      });

      it('should replace element with new html contents', () => {
        let div = document.createElement('div');
        // div.outerHTML = '<p class="myClass">hello</p>';
      });
    });

    describe('nodeValue / data for nodes', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <span id="myEl">
            Hello world
            <!-- Comment here -->
          </span>`;
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should read whats inside node (for non elements)', () => {
        const span = container.querySelector('#myEl');
        const text = span.childNodes[0];
        const comment = span.childNodes[1];
        expect(text.data).to.eql('\n            Hello world\n            ');
        expect(text.nodeValue).to.eql('\n            Hello world\n            ');
        expect(text.textContent).to.eql('\n            Hello world\n            ');

        expect(comment.data).to.eql(' Comment here ');
      });
    });

    describe('textContent', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <span id="myEl">
            Hello world
            <div>buba</div>
          </span>`;
        container.getElementsByTagName('div')[0].textContent = 'sie ma';
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should read text content minus tags', () => {
        expect(container.textContent).to.eql('\n          \n            Hello world\n            sie ma\n          ');
      });
    });

    describe('The hidden property', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <span id="myEl">
          </span>`;
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should hide element just like with css display: none', () => {
        container.hidden = true;
        expect(container.hidden).to.be.true;
      });
    });

    describe('Other specific properties', () => {
      let container;

      beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
          <input type="text" value="hello"/>`;
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container) {
          container.remove();
        }
      });

      it('should have other properties depending on node/element type', () => {
        const input = container.children[0];

        expect(input.type).to.eql('text');
        expect(input.value).to.eql('hello');
      });
    });
  });

  describe('1.6 Attributes and Properties', () => {
    describe('DOM Properties', () => {
      it('should add props to document body clasically', () => {
        document.body.myData = {
          name: 'peter',
          title: 'dev'
        };

        expect(document.body.myData.title).to.eql('dev');

        delete document.body.myData;
      });
    });

    describe('HTML attributes', () => {
      it('should have standard attributes', () => {
        const input = document.createElement('input');

        expect(input.type).to.eql('text');
      });

      it('should have non standard attributes', () => {
        document.body.setAttribute('id', 'myId');
        expect(document.body.id).to.eql('myId');
      });

      describe('.hasAttribute()', () => {
        it('should check for attribute presence', () => {
          const div = document.createElement('div');
          div.setAttribute('title', 'message');

          expect(div.hasAttribute('title')).to.be.true;
        });
      });

      describe('.getAttribute()', () => {
        it('should get attribute value', () => {
          const div = document.createElement('div');
          div.setAttribute('title', 'message');

          expect(div.getAttribute('title')).to.eql('message');
        });
      });

      describe('.setAttribute()', () => {
        it('should set attribute value', () => {
          const div = document.createElement('div');
          div.setAttribute('title', 'message');

          expect(div.getAttribute('title')).to.eql('message');
        });
      });

      describe('.removeAttribute()', () => {
        it('should remove attribute', () => {
          const div = document.createElement('div');
          div.setAttribute('title', 'message');

          expect(div.hasAttribute('title')).to.be.true;

          div.removeAttribute('title');

          expect(div.hasAttribute('title')).not.to.be.true;
        });
      });

      describe('.attributes()', () => {
        it('should list all attributes', () => {
          const div = document.createElement('div');
          div.setAttribute('title', 'message');

          expect(div.attributes.length === 1).to.be.true;
          expect(div.attributes['title'].value).to.eql('message');
          expect(div.attributes[0].name).to.eql('title');
        });
      });

      describe('Property Synchronization', () => {
        it('should standard properties sync with attributes', () => {
          const input = document.createElement('input');
          input.setAttribute('id', 'myId');

          expect(input.id).to.eql('myId');

          input.id = 'newId';

          expect(input.getAttribute('id')).to.eql('newId');
        });

        it('should have exceptions like input.value', () => {
          const input = document.createElement('input');
          input.setAttribute('value', 'peter');

          expect(input.value).to.eql('peter');

          input.value = 'andrew';

          expect(input.getAttribute('value')).to.eql('peter');
        });
      });

      describe('DOM properties are typed', () => {
        it('should attributes be always strings, while values not neccessarily', () => {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('checked', '');
          checkbox.setAttribute('style', 'color: red, width: 50%');

          expect(checkbox.getAttribute('checked')).to.eql('');
          expect(checkbox.getAttribute('style')).to.eql('color: red, width: 50%');
          expect(checkbox.checked).to.be.true;
        });
      });

      describe('Non-standard attributes, dataset', () => {
        it('should use data attributes', () => {
          let div = document.createElement('div');
          div.setAttribute('data-hello', 'world');

          expect(div.dataset.hello).to.eql('world');
        });
      });
    });
  });

  describe('1.7 Modifying the Document', () => {
    describe('Creating element', () => {
      describe('document.createElement()', () => {
        it('should create an element', () => {
          const div = document.createElement('div');

          expect(div.outerHTML).to.eql('<div></div>');
        });
      });

      describe('document.createTextNode()', () => {
        it('should create a text node', () => {
          const text = document.createTextNode('hello world');

          expect(text.data).to.eql('hello world');
          expect(text.nodeValue).to.eql('hello world');
        });
      });

      describe('Create Element with Text', () => {
        it('should create a text node', () => {
          const div = document.createElement('div');
          const text = document.createTextNode('hello world');
          div.appendChild(text);

          expect(div.outerHTML).to.eql('<div>hello world</div>');
        });
      });
    });

    describe('Insertion methods', () => {
      describe('parent.appendChild()', () => {
        it('should append child to parent', () => {
          const parent = document.createElement('div');
          const div = document.createElement('span');
          div.className = 'hello';

          parent.appendChild(div);

          expect(parent.outerHTML).to.eql('<div><span class="hello"></span></div>');
        });

        it('should append a child and remove from other parent if it exists', () => {
          const parent = document.createElement('div');
          const div = document.createElement('span');
          div.className = 'hello';

          parent.appendChild(div);

          expect(parent.outerHTML).to.eql('<div><span class="hello"></span></div>');

          const newParent = document.createElement('div');
          newParent.appendChild(div);

          expect(parent.outerHTML).to.eql('<div></div>');
          expect(newParent.outerHTML).to.eql('<div><span class="hello"></span></div>');

        });
      });

      describe('parent.insertBefore(node, nextSibling)', () => {
        it('should insert node into parent, just before given sibling (prepend to sibling)', () => {
          const parent = document.createElement('div');
          parent.innerHTML = `
          <ul id='list'>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          `;
          const list = parent.querySelector('#list');
          const newLi = document.createElement('li');
          newLi.innerHTML = 'hello world';

          list.insertBefore(newLi, list.children[1]);

          const result = document.createElement('div');

          expect(list.children[0].textContent).to.eql('1');
          expect(list.children[1].textContent).to.eql('hello world');
          expect(list.children[2].textContent).to.eql('2');
          expect(list.children[3].textContent).to.eql('3');
        });
      });

      describe('parent.replaceChild(node, oldChild)', () => {
        it('should replace node into parent with new child, replacing the already existing one', () => {
          const parent = document.createElement('div');
          parent.innerHTML = `
          <ul id='list'>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          `;
          const list = parent.querySelector('#list');
          const newLi = document.createElement('li');
          newLi.innerHTML = 'hello world';

          list.replaceChild(newLi, list.children[1]);

          const result = document.createElement('div');

          expect(list.children[0].textContent).to.eql('1');
          expect(list.children[1].textContent).to.eql('hello world');
          expect(list.children[2].textContent).to.eql('3');
        });
      });

      describe('prepend/append/before/after', () => {
        describe('node.append(...nodes, or strings)', () => {
          it('should append strings at the end of the node', () => {
            const div = document.createElement('div');
            div.innerHTML = '<p>yo</p>';
            div.append('This is text');

            expect(div.outerHTML).to.eql('<div><p>yo</p>This is text</div>');
          });

          it('should append nodes at the end of the node', () => {
            const div = document.createElement('div');
            div.innerHTML = '<p>yo</p>';
            const span = document.createElement('span');
            const p = document.createElement('p');
            div.append(span, p);

            expect(div.outerHTML).to.eql('<div><p>yo</p><span></span><p></p></div>');
          });
        });

        describe('node.prepend(...nodes, or strings)', () => {
          it('should prepend strings at the beginning of the node', () => {
            const div = document.createElement('div');
            div.innerHTML = '<p>yo</p>';
            div.prepend('This is text');

            expect(div.outerHTML).to.eql('<div>This is text<p>yo</p></div>');
          });

          it('should prepend nodes at the beginning of the node', () => {
            const div = document.createElement('div');
            div.innerHTML = '<p>yo</p>';
            const span = document.createElement('span');
            const p = document.createElement('p');
            div.prepend(span, p);

            expect(div.outerHTML).to.eql('<div><span></span><p></p><p>yo</p></div>');
          });
        });

        describe('node.before(...nodes, or strings)', () => {
          it('should insert text before node', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.before('Hello world');

            expect(parent.outerHTML).to.eql('<div>Hello world<p>text</p></div>');
          });

          it('should insert node before node', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.before(document.createElement('span'));

            expect(parent.outerHTML).to.eql('<div><span></span><p>text</p></div>');
          });
        });

        describe('node.after(...nodes, or strings)', () => {
          it('should insert text after node', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.after('Hello world');

            expect(parent.outerHTML).to.eql('<div><p>text</p>Hello world</div>');
          });

          it('should insert node after node', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.after(document.createElement('span'));

            expect(parent.outerHTML).to.eql('<div><p>text</p><span></span></div>');
          });
        });

        describe('node.replaceWith(...nodes, or strings)', () => {
          it('should replace node with text', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.replaceWith('Hello world');

            expect(parent.outerHTML).to.eql('<div>Hello world</div>');
          });

          it('should replace node with another node', () => {
            const parent = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            p.replaceWith(document.createElement('marquee'));

            expect(parent.outerHTML).to.eql('<div><marquee></marquee></div>');
          });
        });
      });

      describe('insertAdjacentHTML/Text/Element', () => {
        // type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
        describe('parent.insertAdjacentElement()', () => {
          let parent, p, span;

          beforeEach(() => {
            parent = document.createElement('div');
            p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);

            span = document.createElement('span');
          });

          it('should insert "beforebegin"', () => {
            p.insertAdjacentElement('beforebegin', span);
            expect(parent.outerHTML).to.eql('<div><span></span><p>text</p></div>');
          });

          it('should insert "afterbegin"', () => {
            p.insertAdjacentElement('afterbegin', span);
            expect(parent.outerHTML).to.eql('<div><p><span></span>text</p></div>');
          });

          it('should insert "beforeend"', () => {
            p.insertAdjacentElement('beforeend', span);
            expect(parent.outerHTML).to.eql('<div><p>text<span></span></p></div>');
          });

          it('should insert "afterend"', () => {
            p.insertAdjacentElement('afterend', span);
            expect(parent.outerHTML).to.eql('<div><p>text</p><span></span></div>');
          });
        });

        describe('parent.insertAdjacentText()', () => {
          let parent, p;

          beforeEach(() => {
            parent = document.createElement('div');
            p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);
          });

          it('should insert "beforebegin"', () => {
            p.insertAdjacentText('beforebegin', 'hello');
            expect(parent.outerHTML).to.eql('<div>hello<p>text</p></div>');
          });

          it('should insert "afterbegin"', () => {
            p.insertAdjacentText('afterbegin', 'hello');
            expect(parent.outerHTML).to.eql('<div><p>hellotext</p></div>');
          });

          it('should insert "beforeend"', () => {
            p.insertAdjacentText('beforeend', 'hello');
            expect(parent.outerHTML).to.eql('<div><p>texthello</p></div>');
          });

          it('should insert "afterend"', () => {
            p.insertAdjacentText('afterend', 'hello');
            expect(parent.outerHTML).to.eql('<div><p>text</p>hello</div>');
          });
        });

        describe('parent.insertAdjacentHTML()', () => {
          let parent, p;

          beforeEach(() => {
            parent = document.createElement('div');
            p = document.createElement('p');
            p.textContent = 'text';
            parent.appendChild(p);
          });

          it('should insert "beforebegin"', () => {
            p.insertAdjacentHTML('beforebegin', '<span></span>');
            expect(parent.outerHTML).to.eql('<div><span></span><p>text</p></div>');
          });

          it('should insert "afterbegin"', () => {
            p.insertAdjacentHTML('afterbegin', '<span></span>');
            expect(parent.outerHTML).to.eql('<div><p><span></span>text</p></div>');
          });

          it('should insert "beforeend"', () => {
            p.insertAdjacentHTML('beforeend', '<span></span>');
            expect(parent.outerHTML).to.eql('<div><p>text<span></span></p></div>');
          });

          it('should insert "afterend"', () => {
            p.insertAdjacentHTML('afterend', '<span></span>');
            expect(parent.outerHTML).to.eql('<div><p>text</p><span></span></div>');
          });
        });
      });

      describe('All Insertion Methods Remove Node From Old Place', () => {
        it('should remove node from old place', () => {
          let div = document.createElement('div');
          let a = document.createElement('a');
          let b = document.createElement('b');

          div.append(a, b);

          b.after(a);

          expect(div.outerHTML).to.eql('<div><b></b><a></a></div>');
        });
      });
    });

    describe('Cloning nodes: cloneNode()', () => {
      it('should clone deeply (true)', () => {
        let div = document.createElement('div');
        div.innerHTML = `<span>hello<b>world</b></span>`;

        const clone = div.cloneNode(true);

        expect(clone.outerHTML).to.eql(`<div><span>hello<b>world</b></span></div>`);
      });

      it('should clone shallow, without child elements (false)', () => {
        let div = document.createElement('div');
        div.innerHTML = `<span>hello<b>world</b></span>`;

        const clone = div.cloneNode(false);

        expect(clone.outerHTML).to.eql(`<div></div>`);
      });
    });

    describe('Removal Methods', () => {
      describe('parentElem.removeChild(node)', () => {
        it('should remove child node', () => {
          let div = document.createElement('div');
          div.insertAdjacentHTML('beforeend', '<span>hello</span><b id="bee">world</b>');
          const b = div.children[1];

          const removed = div.removeChild(b);

          expect(div.outerHTML).to.eql('<div><span>hello</span></div>');
          expect(removed.outerHTML).to.eql('<b id="bee">world</b>');
        });

        it('should remove node', () => {
          let div = document.createElement('div');
          div.insertAdjacentHTML('beforeend', '<span>hello</span><b id="bee">world</b>');
          const b = div.children[1];

          const removed = b.remove();

          expect(div.outerHTML).to.eql('<div><span>hello</span></div>');
          expect(removed).to.be.undefined;
        });
      });
    });
  });

  describe('1.8 Styles and Classes', () => {
    describe('className', () => {
      it('should assign a class to element', () => {
        const div = document.createElement('div');
        div.className = 'myClass';

        expect(div.outerHTML).to.eql('<div class="myClass"></div>')
      });

      it('should replace all existing classes', () => {
        const div = document.createElement('div');
        div.setAttribute('class', 'a b');
        expect(div.outerHTML).to.eql('<div class="a b"></div>')

        div.className = 'myClass';

        expect(div.outerHTML).to.eql('<div class="myClass"></div>')
      });
    });

    describe('classList', () => {
      it('classList.contains()', () => {
        const div = document.createElement('div');
        div.setAttribute('class', 'a b');

        expect(div.classList.contains('a')).to.be.true;
        expect(div.classList.contains('c')).to.be.false;
      });

      it('classList.add()', () => {
        const div = document.createElement('div');
        div.classList.add('a');

        expect(div.classList.contains('a')).to.be.true;
        expect(div.classList.contains('c')).to.be.false;
      });

      it('classList.remove()', () => {
        const div = document.createElement('div');
        div.classList.add('a');

        expect(div.classList.contains('a')).to.be.true;

        div.classList.remove('a');

        expect(div.classList.contains('a')).to.be.false;
      });

      it('classList.toggle()', () => {
        const div = document.createElement('div');
        div.classList.toggle('a');

        expect(div.classList.contains('a')).to.be.true;

        div.classList.toggle('a');

        expect(div.classList.contains('a')).to.be.false;
      });

      it('should classList be iterable', () => {
        const div = document.createElement('div');
        div.classList.add('a');
        div.classList.add('b');
        div.classList.add('c');

        const classes = Array.from(div.classList);

        expect(classes).to.eql(['a', 'b', 'c']);
      });
    });

    describe('element.style', () => {
      it('should have properties from style', () => {
        const div = document.createElement('div');
        div.setAttribute('style', 'width: 100px; color: red; border-left-width: 5px');

        expect(div.style.width).to.eql('100px');
        expect(div.style.color).to.eql('red');
        expect(div.style.borderLeftWidth).to.eql('5px');
      });

      it('should reset the style property by assigning empty string to property', () => {
        const div = document.createElement('div');
        div.setAttribute('style', 'width: 100px');

        div.style.width = '';

        expect(div.style.width).to.eql('');
      });

      it('should use cssText', () => {
        const div = document.createElement('div');
        div.style.cssText = `
          color: red !important;
          background-color: yellow;
          width: 100px;
          text-align: center;
      `;

        expect(div.style.color).to.eql('red');
        expect(div.style.width).to.eql('100px');
        expect(div.style.backgroundColor).to.eql('yellow');
        expect(div.style.textAlign).to.eql('center');
      });

      it('should mind the units', () => {
        const div = document.createElement('div');
        div.setAttribute('style', 'width: 100px; top: 5rem');

        expect(div.style.width).to.eql('100px');
        expect(div.style.top).to.eql('5rem');
      });
    });

    describe('.getComputedStyle()', () => {
      it('should read computed style, resolved in px, not only from style property but computed once everything settled down', () => {
        document.body.style.marginTop = '2rem';
        expect(getComputedStyle(document.body).marginTop).to.eql('32px');
        document.body.style.marginTop = '';
      });

      describe('box-sizing', () => {
        describe('content-box makes style width apply to content only, without padding and margin', () => {
          it('should return size without border and padding', () => {
            const div = document.createElement('div');
            div.innerHTML = 'content-box <br/>Lorem ipsum dolor sit amet';
            div.style.cssText = `
            width: 300px;
            height: 200px;
            border: 25px solid #e8c48f;
            box-sizing: content-box;
            padding: 20px;
          `;
            document.body.appendChild(div);

            expect(getComputedStyle(div).width).to.eql('300px')

            div.remove();
          });

          it('should return size without border and padding and minus scroll (not firefox)', () => {
            const div = document.createElement('div');
            div.innerHTML = 'content-box, scroll <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
            div.style.cssText = `
            width: 300px;
            height: 200px;
            border: 25px solid #e8c48f;
            box-sizing: content-box;
            padding: 20px;
            overflow: auto;
          `;
            document.body.appendChild(div);

            if (isFirefox()) {
              expect(getComputedStyle(div).width).to.eql('300px');
            } else {
              expect(getComputedStyle(div).width).to.eql(300 - getScrollSize() + 'px');
            }

            div.remove();
          });
        });

        describe('border-box, makes style width apply to total width of box, including padding and margin, thus making content smaller', () => {
          it('should return size including border and padding', () => {
            const div = document.createElement('div');
            div.innerHTML = 'border box, <br/>Lorem ipsum dolor sit amet';
            div.style.cssText = `
            width: 300px;
            height: 200px;
            border: 25px solid #e8c48f;
            box-sizing: border-box;
            padding: 20px;
          `;
            document.body.appendChild(div);

            expect(getComputedStyle(div).width).to.eql('300px')

            div.remove();
          });

          it('should return size including border and padding + scroll', () => {
            const div = document.createElement('div');
            div.innerHTML = 'border-box, scroll <br/>dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
            div.style.cssText = `
            width: 300px;
            height: 200px;
            border: 25px solid #e8c48f;
            box-sizing: border-box;
            padding: 20px;
            overflow: auto;
          `;
            document.body.appendChild(div);

            expect(getComputedStyle(div).width).to.eql('300px')

            div.remove();
          });
        });
      });
    });
  });

  describe('1.9 Element Size And Scrolling', () => {
    let parent;
    let div;

    beforeEach(() => {
      parent = document.createElement('div');
      parent.className = 'parent';
      parent.style.cssText = `
        border: 1px solid red;
        position: relative;
        width: 500px;
        height: 600px;
      `;

      div = document.createElement('div');
      div.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
      div.style.cssText = `
        width: 300px;
        height: 200px;
        border: 25px solid #e8c48f;
        border-left-width: 15px;
        border-right-width: 35px;
        box-sizing: content-box;
        position: absolute;
        padding: 20px;
        overflow: auto;
        top: 50px;
        left: 70px;
      `;
      parent.appendChild(div);
      document.body.appendChild(parent);
    });

    afterEach(() => {
      parent.remove();
    });

    describe('Scroll Size', () => {
      it('should calculate scroll size using difference of offsetWidth and clientWidth', () => {
        expect(getScrollSize()).to.be.a('number');
      });
    });

    describe('Geometry properties', () => {
      it('should know base box properties', () => {
        const div = document.createElement('div');
        div.offsetParent;
        div.offsetTop;
        div.offsetLeft;
        div.offsetWidth;
        div.offsetHeight;

        div.scrollTop;
        div.scrollLeft;
        div.scrollWidth;
        div.scrollHeight;

        div.clientWidth;
        div.clientHeight;
        div.clientLeft;
        div.clientTop;
      });
    });

    it('should geometry props be zero for hidden elements', () => {
      expect(div.offsetWidth).to.be.greaterThan(0);
      expect(div.clientWidth).to.be.greaterThan(0);
      
      div.hidden = true;

      expect(div.offsetWidth).to.eql(0);
      expect(div.clientWidth).to.eql(0);
    });

    it('should not take geometry from getComputedStyle() / CSS, it depends on box sizing and browser inconsistencies (scroolbar i.e.)', () => { });

    describe('Offset', () => {
      describe('.offsetParent', () => {
        it('should find first parent which is positioned (with position relative, absolute, fixed, tables or body)', () => {
          expect(div.offsetParent === parent).to.be.true;
        });
      });

      describe('.offsetTop', () => {
        it('should return top distance from top/left offsetParent corner', () => {
          expect(div.offsetTop).to.eql(50);
        });
      });

      describe('.offsetLeft', () => {
        it('should return left distance from top/left offsetParent corner', () => {
          expect(div.offsetLeft).to.eql(70);
        });
      });

      describe('.offsetWidth', () => {
        it('should return outermost width including paddings and borders', () => {
          expect(div.offsetWidth).to.eql(390);
        });
      });

      describe('.offsetHeight', () => {
        it('should return outermost height including paddings and borders', () => {
          expect(div.offsetHeight).to.eql(290);
        });
      });
    });

    describe('Client', () => {
      describe('.clientTop', () => {
        it('should measure size of border-top-width, plus height of scrollbar if its on top', () => {
          expect(div.clientTop).to.eql(25);
        });
      });

      describe('.clientLeft', () => {
        it('should measure size of border-left-width, plus height of scrollbar if its on left', () => {
          expect(div.clientLeft).to.eql(15);
        });
      });

      describe('.clientLeft with scroll', () => {
        it('should measure size of border-left-width, plus height of scrollbar if its on left', () => {
          div.style.direction = 'rtl';
          expect(div.clientLeft).to.eql(15 + getScrollSize());
        });
      });

      describe('.clientWidth', () => {
        it('should return width together with paddings but without scrollbar', () => {
          expect(div.clientWidth).to.eql(300 /* width */ + 2 * 20 /* paddings */ - getScrollSize());
        });
      });

      describe('.clientHeight', () => {
        it('should return height together with paddings but without scrollbar', () => {
          expect(div.clientHeight).to.eql(200 /* width */ + 2 * 20 /* paddings */);
        });
      });
    });

    describe('Scroll', () => {
      describe('.scrollWidth', () => {
        it('should measure width of whole element, even that not visible, hidden behind scroll', () => {
          expect(div.scrollWidth).to.eql(300 /* width */ + 2*20 /* paddings */ - getScrollSize());
        });

        it('should be same as clientWidth if no horizontal scroll', () => {
          expect(div.scrollWidth).to.eql(div.clientWidth);
        });
      });

      describe('.scrollHeight', () => {
        it('should measure height of whole element, even that not visible, hidden behind scroll', () => {
          expect(div.scrollHeight).to.be.greaterThan(300 /* hard to test on different browsers, its enought to know how it works */);
        });
      });

      describe('.scrollTop', () => {
        it('should measure amount of vertical scroll', () => {
          div.scrollTop += 250;
          expect(div.scrollTop).to.eql(250);
        });
      });

      describe('.scrollLeft', () => {
        it('should measure amount of horizontal scroll', () => {
          div.scrollLeft += 50;
          expect(div.scrollLeft).to.eql(0); // no scroll here from css styles and content, that's why 0
        });
      });
    });
  });
});

function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function getScrollSize() {
  const div = document.createElement('div');
  div.style.cssText = `
    width: 50px;
    height: 50px;
    overflow-y: scroll;
  `;
  document.body.appendChild(div);

  let size = div.offsetWidth - div.clientWidth;

  div.remove();

  return size;
}