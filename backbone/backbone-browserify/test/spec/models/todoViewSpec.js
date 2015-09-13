var TodoView = require('../../../src/app/views/todoView');

describe('TodoView', function() {
	it('should have p tag', function() {
		expect(TodoView.prototype.tagName).toEqual('p');
	});

	it('should have render method', function() {
		expect(TodoView.prototype.render).toBeDefined();
	});

	it('should have dom events defined', function() {
		expect(TodoView.prototype.events).toBeDefined();
	});

	it('should have click event defined', function() {
		expect(TodoView.prototype.events['click']).toBeDefined();
	});

	it('should have click event handled', function() {
		expect(TodoView.prototype.events['click']).toEqual('clicked');
	});
});