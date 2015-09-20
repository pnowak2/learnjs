require("babelify/polyfill");

describe('unicode support', function() {
    it('character saved using two 16byte units', function() {
        var text = "𠮷";
        expect(text.length).toBe(2);
    });

    it('charCodeAt and codePointAt', function() {
			var text = "𠮷a";

			expect(text.length).toBe(3);

			expect(text.charCodeAt(0)).toBe(55362);
			expect(text.charCodeAt(1)).toBe(57271);
			expect(text.charCodeAt(2)).toBe(97);

			// codePointAt zero position describes the whole character
			// codePointAt one, tells just the part of the character which is longer than one byte
			expect(text.codePointAt(0)).toBe(134071);
			expect(text.codePointAt(1)).toBe(57271);
			expect(text.codePointAt(2)).toBe(97);
    });

    describe('nw string methods', function() {
    	it('includes', function () {
    		expect('hello'.includes('o')).toBe(true);
    	});

    	it('includes at certain position', function() {
    		expect('hello'.includes('o', 8)).toBe(false);
    	});

    	it('startsWith', function () {
    		expect('hello'.startsWith('he')).toBe(true);
    	});

    	it('startsWith at index', function() {
    		expect('hello'.startsWith('ll', 2)).toBe(true);
    	});

    	it('endsWith', function () {
    		expect('hello'.endsWith('lo')).toBe(true);
    	});

    	it('repeat', function() {
    		expect('boo'.repeat(3)).toBe('boobooboo');
    	});
    });

    describe('string templates', function() {
    	it('backticks for basic template string', function() {
    		var message = `hello world`;
    		expect(message).toBe('hello world');
    		expect(message).toEqual(jasmine.any(String));
    	});

    	it('multiline string', function() {
    		var message = `
    		<div>
    			<h1>title</h1>
    		</div>`

    		expect(message.includes('title')).toBeTruthy();
    	});

    	it('substitutions need to use backticks as string template', function() {
    		var name = 'piotr nowak',
    				age = 35,
    				msg = `hello ${name}, doubled age is ${age * 2}.`;

    		expect(msg).toBe('hello piotr nowak, doubled age is 70.');
    	});
    });
});