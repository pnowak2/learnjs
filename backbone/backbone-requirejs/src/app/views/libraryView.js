define(['backbone', 
				'app/views/bookView', 
				'app/collections/libraryCollection'], 
				function (Backbone, 
									BookView, 
									LibraryCollection) {

	var LibraryView = Backbone.View.extend({
		id: 'books',

		tagName: 'ul',

		collection: new LibraryCollection,

		initialize: function () {
			this.listenTo(this.collection, 'invalid', this.validationErrorOccured);
			this.listenTo(this.collection, 'add', this.render);
		},

		createBook: function(bookTitle) {
			var isValid = this.collection.add({
				title: bookTitle
			}, {
				validate: true
			});

			if(isValid) {
				this.trigger('book:success');
			}
		},

		validationErrorOccured: function (e, m) {
			this.trigger('book:error', m);
		},

		render: function () {
			this.$el.empty();

			this.collection.forEach(function (book) {
				var bookView = new BookView({
					model: book
				});

				this.$el.append(bookView.render().el);
			}, this);
			return this;
		}
	});

	return LibraryView;
});