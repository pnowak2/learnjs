describe('Book Model', function() {

	describe('Constructor', function() {
		it('should exist', function() {
			expect(app.Book.prototype).toEqual(jasmine.any(Backbone.Model));
		});
	});

	describe('Defaults', function() {
		it('should be set correctly', function() {
			expect(app.Book.prototype.defaults).toEqual({
				coverImage: 'assets/cover.png',
				title: 'No title',
				author: 'Unknown',
				releaseDate: 'Unknown',
				keywords: 'None'
			})
		});
	});

});