var expect = require('chai').expect;

describe('Block bindings', function() {
  it('should hoist var declarations', function() {
    if (true) {
      var value = 'blue';
    } 

    expect(value).to.eql('blue');
  });

  it('should not hoist let declarations', function() {
    if (true) {
      let value = 'blue';
    } 

    expect(typeof value).to.eql('undefined');
  });

  it('should raise an error for redeclaration', function() {
    var count = 30;

    // let count = 15; // error
  });

  it('should not raise an error for redeclaration', function() {
    var count = 30;
    if (true) {
      let count = 15;
    }
  });

  it('should allow for constant declarations', function() {
    const maxItems = 20;
  });

  it('should not hoist const declarations', function() {
    if (true) {
      const value = 'blue';
    } else {
      expect(value).to.be.ok;
    }
  });

  it('should not reassign const value', function() {
    const maxItems = 35;
    // maxItems = 32 // error
  });

  it('should prevent modification of objects', function() {
    const person = {
      name: 'peter'
    };

    person.name = 'thomas';
    // person = {} // error
  });

  it('should have temporal dead zone', function() {
    if (true) {
      expect(value).to.be.undefined;
      const value = undefined;
    }
  });

  it('should have var accessible outside the loop', function() {
    for (var i = 0; i < 3; i++) {

    };

    expect(i).to.equal(3);
  });

  it('should have var accessible outside the loop', function() {
    for (let i = 0; i < 3; i++) {

    };

    expect(typeof i).to.equal('undefined');
  });

  it('should use closure to store function with closure context', function() {
    var funcs = [];
    for (var i = 0; i < 3; i++) {
      funcs.push(function(value) {
        return function() {
          return value * value;
        };
      }(i));
    }

    expect(funcs[0]()).to.eql(0);
    expect(funcs[1]()).to.eql(1);
    expect(funcs[2]()).to.eql(4);
  });

  it('should use simplified closure with let to store function with closure context avoiding IIFE', function() {
    var funcs = [];
    for (let i = 0; i < 3; i++) {
      funcs.push(function() {
        return i * i;
      });
    }

    expect(funcs[0]()).to.eql(0);
    expect(funcs[1]()).to.eql(1);
    expect(funcs[2]()).to.eql(4);
  });

  it('should not use constant in loop', function() {
    var funcs = [];

    // throws an error after one iteration
    // for (const i = 0; i < 10; i++) {
    //   funcs.push(function() {
    //     console.log(i);
    //   });
    // }
  });
});