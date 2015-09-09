define(['app/views/bookView'], function (BookView) {
	describe('Book View', function() {
		it('should be defined', function() {
			expect(BookView.prototype).toEqual(jasmine.any(Backbone.View));
		});
	});
});
