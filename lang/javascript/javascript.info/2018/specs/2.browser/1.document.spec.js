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
          expect(document.body.lastChild).to.equal(document.body.childNodes[document.body.childNodes.length-1]);
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
            expect(document.body.lastElementChild).to.equal(document.body.children[document.body.children.length-1]);
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
      let tbl;
      beforeEach(() => {
        tbl = document.createElement('table');
        tbl.setAttribute('id', 'table');
        document.body.appendChild(tbl);
      });

      afterEach(() => {
        if(tbl) {
          tbl.remove();
        }
      });

      it('should have table related properties', () => {
        expect(table).to.have.property('rows');
        expect(table).to.have.property('caption');
        expect(table).to.have.property('rows');
      });

      it('should behave...', () => {
        
      });
    });
  });
});

