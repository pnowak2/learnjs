define(['backbone', 'app/models/bookModel'], function (Backbone, Book) {
	var Library = Backbone.Collection.extend({
		model: Book
	});

	return Library;
});