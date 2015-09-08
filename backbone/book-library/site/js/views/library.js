var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',

	events: {
		'click #add': 'addBook'
	},

	initialize: function () {
		this.collection = new app.Library();
		this.collection.fetch({reset: true});

		this.render();

		this.listenTo(this.collection, 'add', this.renderBook);
		this.listenTo(this.collection, 'reset', this.render);
	},

	addBook: function (e) {
		e.preventDefault();

		var formData = {};

		this.$('#addBook div input').each(function (i, el) {
			if ($(el).val() != '') {
				if (el.id === 'keywords') {
					formData[el.id] = [];
					_.each($(el).val().split(' '), function (keyword) {
						formData[el.id].push(keyword);
					});
				} else {
					formData[el.id] = $(el).val();
				}
				$(el).val('');
			}
		});

		this.collection.create(formData);
	},

	render: function () {
		this.collection.each(function (book) {
			var bookView = this.renderBook(book);
		}, this);
		return this;
	},

	renderBook: function (book) {
		var bookView = new app.BookView({
			model: book
		});

		this.$el.append(bookView.render().el);
	}
});