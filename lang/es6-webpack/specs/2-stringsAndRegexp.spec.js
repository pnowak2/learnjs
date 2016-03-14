var expect = require('chai').expect;
var sinon = require('sinon');

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
      expect(text.codePointAt(0)).to.equal(134071); // does not work with babel
      expect(String.fromCodePoint(134071)).to.equal('𠮷'); // does not work with babel
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
    it('should duplicate regexp', function() {
      var re1 = /ab/i,
        re2 = new RegExp(re1, 'g');

      expect(re1.toString()).to.equal('/ab/i');
      // expect(re1.toString()).to.equal('/ab/g'); // does not work with babel
    });

    it('should have flags property', function() {
      var re1 = /ab/i;

      expect(re1.flags).to.equal('i');
    });
  });

  describe('template literals', function() {
    it('should be defined with backticks', function() {
      expect(`hello`).to.equal('hello');
    });

    it('should use backticks inside string', function() {
      expect(`hello\`world`).to.equal('hello`world')
    });

    it('should be type of string', function() {
      expect(`hello`).to.be.a('string');
    });
  });

  describe('multiline strings', function() {
    it('should use pre es6 workaround', function() {
      var message = ['multiline', 'string'].join('\n');
      expect(message).to.equal('multiline\nstring');
    });

    it('should use es6 way for multiline strings', function() {
      let multiline = `multiline
        string`;
      expect(multiline).to.equal(`multiline
        string`)
    });
  });

  describe('substitutions', function() {
    it('should substitute variables inside template string', function() {
      let name = 'peter',
        message = `hello ${name}`;

      expect(message).to.equal('hello peter');
    });

    it('should allow for small evaluation in substitution', function() {
      expect(`2 + 2 is ${2+2}`).to.equal('2 + 2 is 4');
    });
  });

  describe('tagged templates', function() {
    it('should call tag function with appropriate params', function() {
      var tag = sinon.spy();

      let replaced = 'replaced';

      let text = tag `this is ${replaced} text`;

      expect(tag.calledOnce).to.be.ok;
      expect(tag.firstCall.args[0]).to.eql(['this is ', ' text']);
      expect(tag.firstCall.args[1]).to.equal('replaced');
    });
  });

  describe('raw values', function() {
    it('should handle raw values properly', function() {
      let message1 = `Multiline\nstring`,
        message2 = String.raw `Multiline\nstring`;

      expect(message1).to.eql(`Multiline
string`);
      expect(message2).to.eql('Multiline\\nstring');
    });
  });
});