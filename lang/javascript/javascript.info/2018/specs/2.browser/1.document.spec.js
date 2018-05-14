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
      it('should behave...', () => {
        
      });
    });
  });
});

