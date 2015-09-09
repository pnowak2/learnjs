define(['backbone', 'app/models/bookModel'], function (Backbone, BookModel) {
	describe('Book Model', function() {
		it('should be defined', function() {
			expect(BookModel.prototype).toEqual(jasmine.any(Backbone.Model));
		});

		it('should have correct defaults', function() {
			expect(BookModel.prototype.defaults).toEqual({
				title: 'no title'
			})
		});
	});
});
