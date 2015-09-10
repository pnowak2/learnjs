define(['backbone', 'app/models/bookModel'], function (Backbone, Book) {
	var Library = Backbone.Collection.extend({
		model: Book,

		completed: function () {
			return this.where({
				completed: true
			});
		},

		remaining: function () {
			return this.where({
				completed: false
			});
		}
	});

	return Library;
});