define(['backbone' ,'app/collections/libraryCollection'], function (Backbone, Library) {
	describe('Library collection', function() {
		it('should be defined', function() {
			expect(Library.prototype).toEqual(jasmine.any(Backbone.Collection));
		});
	});
});