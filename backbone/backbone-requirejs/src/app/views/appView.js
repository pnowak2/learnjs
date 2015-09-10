define(['backbone', 
				'app/views/createBookView',
				'app/views/libraryView',
				'app/views/bookView'
			 ], 
				function (Backbone, 
									CreateBookView,
									LibraryView,
									BookView) {

	var AppView = Backbone.View.extend({

		libraryView: new LibraryView,
		createBookView: new CreateBookView,

		initialize: function () {

		},

		render: function () {
			this.$el.append(this.createBookView.render().el);
			this.$el.append(this.libraryView.render().el);

			return this;
		}
	});

	return AppView;
});