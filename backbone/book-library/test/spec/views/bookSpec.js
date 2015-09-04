describe('Book View', function() {

	describe('Constructor', function() {
		it('should exist', function() {
			expect(app.BookView.prototype).toEqual(jasmine.any(Backbone.View));
		});
	});

	describe('View Element', function() {
		it('should be a div', function() {
			expect(app.BookView.prototype.tagName).toBe('div');
		});

		it('should have class name', function() {
			expect(app.BookView.prototype.className).toBe('bookContainer');
		});
	});

});