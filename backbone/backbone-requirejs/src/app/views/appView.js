define(['backbone', 
				'mustache',
				'app/views/createBookView',
				'app/views/libraryView',
				'text!templates/app.html'
			 ], 
				function (Backbone, 
									Mustache,
									CreateBookView,
									LibraryView,
									appTemplate) {

	var AppView = Backbone.View.extend({
		tagName: 'section',
		createBookView: new CreateBookView,
		libraryView: new LibraryView,

		initialize: function () {
			this.listenTo(this.createBookView, 'book:create', _.bind(this.createBook, this));
			this.listenTo(this.libraryView.collection, 'change', _.bind(this.changedBook, this));
			this.listenTo(this.libraryView, 'book:success', _.bind(this.bookCreated, this));
			this.listenTo(this.libraryView, 'book:error', _.bind(this.bookCreateError, this));
		},

		createBook: function (title) {
			this.libraryView.createBook(title);
		},

		changedBook: function () {
			this.$('.completed').text(this.libraryView.collection.completed().length);
		},

		bookCreated: function () {
			this.createBookView.bookSuccess();
		},

		bookCreateError: function (msg) {
			this.createBookView.bookError(msg);
		},

		render: function () {
			var html = Mustache.render(appTemplate, {
				completed: this.libraryView.collection.completed().length
			});
			this.$el.html(html);

			this.$('.form').html(this.createBookView.render().el)
			this.$('.list').html(this.libraryView.render().el)

			return this;
		}
	});

	return AppView;
});