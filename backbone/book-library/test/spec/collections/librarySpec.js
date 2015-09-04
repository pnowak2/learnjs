describe('Library Collection', function() {
	
	describe('Constructor', function() {
		it('should exist', function() {
			expect(app.Library.prototype).toEqual(jasmine.any(Backbone.Collection));
		});
	});

	describe('Model', function() {
		it('should be set to Book', function() {
			expect(app.Library.prototype.model).toBe(app.Book);
		});
	});

});