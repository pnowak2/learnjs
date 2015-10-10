var expect = require('chai').expect;

describe('bdd assertions', function() {
    it('.not() - negates following assertion', function() {
        expect('peter').not.to.equal('piotr');
    });

    it('.deep - later used by the equal and property assertions', function() {
    	var obj = { name: 'peter' };

        expect(obj).to.deep.equal({ name: 'peter' });
    });

    it('.any - later used in the keys assertion', function() {
    	var obj = { 
    		name: 'peter',
    		age: 12,
    		sex: 'male'
    	};

    	expect(obj).to.have.any.keys('name', 'sex', 'other', 'notexisting');
    });

    it('.all - later used in the keys assertion', function() {
    	var obj = { 
    		name: 'peter',
    		age: 12,
    		sex: 'male'
    	};

    	expect(obj).to.have.all.keys('name', 'age', 'sex');
    });

    it('.a(type) - language chain or assert values type', function () {
        expect('test').to.be.a('string');
        expect({}).to.be.an('object');
        expect(null).to.be.a('null');
        expect(undefined).to.be.an('undefined');
    });

    it('.include(value) - inclusion of object in array or string', function () {
        expect([1, 2, 3]).to.include(2);
        expect("the text").to.include('text');
        expect({name: 'peter', age: 35}).to.contain.keys('name', 'age');
    });

    it('.contain(value) - inclusion of object in array or string', function () {
        expect([1, 2, 3]).to.contain(2);
        expect("the text").to.contain('text');
    });

    it('.ok() - target is truthy', function() {
        expect('text').to.be.ok;
        expect(1).to.be.ok;
        expect('').not.to.be.ok;
        expect(null).not.to.be.ok;
        expect(undefined).not.to.be.ok;
        expect(false).not.to.be.ok;
    });

    it('.true - target is true', function() {
        expect(true).to.be.true;
        expect(1).not.to.be.true;
    });

    it('.false - target is false', function() {
        expect(false).to.be.false;
        expect(0).not.to.be.false;
    });
});

describe('multiple assertions in one chain', function() {
    it('can chain assertions', function() {
        expect('peter'.length)
            .to.eql(5)
            .and.below(10)
            .and.a('number');
    });
});
