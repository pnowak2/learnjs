var app = app || {};

app.BookView = Backbone.View.extend({
	className: 'bookContainer',

	events: {
		'click .delete': 'deleteBook',
		'click': 'showDetails'
	},

	deleteBook: function (e) {
		this.model.destroy();
		this.remove();
	},

	showDetails: function (e) {
		if(e.target.className !== 'delete') {
			this.trigger('book:show', this.model.toJSON());
		}
	},

	template: function () {
		return _.template($('#bookTemplate').html());
	},

	render: function () {
		this.$el.html( this.template()(this.model.toJSON()) );
		return this;
	}
});
