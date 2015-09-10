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
			this.listenTo(this.libraryView, 'book:success', _.bind(this.bookCreated, this));
			this.listenTo(this.libraryView, 'book:error', _.bind(this.bookCreateError, this));
		},

		createBook: function (title) {
			this.libraryView.createBook(title);
		},

		bookCreated: function () {
			this.createBookView.bookSuccess();
		},

		bookCreateError: function (msg) {
			this.createBookView.bookError(msg);
		},

		render: function () {
			var html = Mustache.render(appTemplate, {
				form: this.createBookView.render().$el.html(),
				list: this.libraryView.render().$el.html()
			});

			this.$el.html(html);

			return this;
		}
	});

	return AppView;
});