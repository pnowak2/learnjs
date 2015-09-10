define(['text!test/fixtures/bookView.html', 'app/views/bookView'], function (bookItemTemplate, BookView) {
	describe('Book View', function() {
		it('should be defined', function() {
			expect(BookView.prototype).toEqual(jasmine.any(Backbone.View));
		});
	});
});
