define(['backbone', 
				'app/views/bookView', 
				'app/collections/libraryCollection'], 
				function (Backbone, 
									BookView, 
									LibraryCollection) {

	var LibraryView = Backbone.View.extend({
		id: 'books',
		tagName: 'ul',

		initialize: function () {
			this.listenTo(this.collection, 'invalid', this.validationErrorOccured);
			this.listenTo(this.collection, 'add', this.render);
			Backbone.listenTo(Backbone, 'book:create', _.bind(this.bookCreated, this));
		},

		bookCreated: function(bookTitle) {
			var isValid = this.collection.add({
				title: bookTitle
			}, {
				validate: true
			});

			if(isValid) {
				Backbone.trigger('book:success');
			}

			console.log(this.collection.completed());
		},

		validationErrorOccured: function (e, m) {
			Backbone.trigger('book:error', m);
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