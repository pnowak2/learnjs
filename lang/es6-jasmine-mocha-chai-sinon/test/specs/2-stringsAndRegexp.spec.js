require("babel-polyfill");
var expect = require('chai').expect;

describe('Strings and Regular expressions', function() {
  describe('Unicode', function() {
    it('should handle utf-16 strings', function() {
      var text = "𠮷";
      expect(text.length).to.equal(2);
      expect(/^.$/.test(text));
      expect(text.charAt(0)).to.be.a('string');
      expect(text.charAt(1)).to.be.a('string');
      expect(text.charCodeAt(0)).to.equal(55362);
      expect(text.charCodeAt(1)).to.equal(57271);
    });

    it('should be properly handling with code points', function() {
      var text = "𠮷";
      expect(text.charCodeAt(0)).to.equal(55362);
      // expect(text.codePointAt(0)).to.equal(134071); // does not work with babel
      // expect(String.fromCodePoint(134071)).to.equal('𠮷'); // does not work with babel
    });

    it('should handle properly unicode regexp', function() {
      var text = "𠮷";
      expect(/^.$/).to.be.ok;
      expect(/^.$/u.test(text)).to.be.ok;
    });
  });

  describe('String api', function() {
    it('.includes() should check if string includes other string', function() {
      expect('test'.includes('es')).to.be.ok;
      expect('test'.includes('st'), 2).to.be.ok;
    });

    it('.startsWith() should check if string starts with another string', function() {
      expect('hello world'.startsWith('hel')).to.be.ok;
      expect('hello world'.startsWith('llo', 2)).to.be.ok;
    });

    it('.endsWith() should check if string ends with another string', function() {
      expect('hello world'.endsWith('rld')).to.be.ok;
      expect('hello world'.endsWith(' wo', 8)).to.be.ok;
    });

    it('.repeat(n) should repeat string n times', function() {
      expect('test'.repeat(2)).to.equal('testtest');
    });
  });

  describe('regular expressions', function() {
    it('should behave...', function() {
      
    });
  });
});