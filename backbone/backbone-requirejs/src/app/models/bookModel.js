define(['backbone'], function (Backbone) {
	var Book = Backbone.Model.extend({
		defaults: {
			title: 'no title'
		}
	});

	return Book;
});
