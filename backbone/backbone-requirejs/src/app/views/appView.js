define(['backbone', 
				'mustache',
				'app/views/createBookView',
				'app/views/libraryView',
				'app/views/counterView',
				'text!templates/app.html'
			 ], 
				function (Backbone, 
									Mustache,
									CreateBookView,
									LibraryView,
									CounterView,
									appTemplate) {

	var AppView = Backbone.View.extend({
		tagName: 'section',

		initialize: function () {
			this.libraryView = new LibraryView;
			this.createBookView = new CreateBookView({
				collection: this.libraryView.collection
			});
			this.counterView = new CounterView({
				collection: this.libraryView.collection
			});
			
			this.listenTo(this.createBookView, 'book:create', _.bind(this.createBook, this));
			this.listenTo(this.createBookView, 'book:remove-all', _.bind(this.removeAllBooks, this));
			this.listenTo(this.libraryView, 'book:success', _.bind(this.bookCreated, this));
			this.listenTo(this.libraryView, 'book:error', _.bind(this.bookCreateError, this));
		},

		createBook: function (title) {
			this.libraryView.createBook(title);
		},

		removeAllBooks: function (title) {
			this.libraryView.collection.completed().forEach(function (item) {
				item.destroy();
			});
		},

		bookCreated: function () {
			this.createBookView.bookSuccess();
		},

		bookCreateError: function (msg) {
			this.createBookView.bookError(msg);
		},

		render: function () {
			var html = Mustache.render(appTemplate);
			this.$el.html(html);

			this.$('.form').html(this.createBookView.render().el);
			this.$('.list').html(this.libraryView.render().el);
			this.$('.counter').html(this.counterView.render().el);

			return this;
		}
	});

	return AppView;
});