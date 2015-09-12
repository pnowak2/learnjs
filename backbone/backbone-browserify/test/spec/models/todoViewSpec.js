var TodoView = require('../../../src/app/views/todoView');

describe('TodoView', function() {
	it('should have p tag', function() {
		expect(TodoView.prototype.tagName).toEqual('p');
	});
});