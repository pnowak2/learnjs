var app = app || {};

app.BookView = Backbone.View.extend({
	className: 'bookContainer',

	events: {
		'click .delete': 'deleteBook',
		'click': 'showDetails'
	},

	deleteBook: function (e) {
		console.log('delete');
		this.model.destroy();
		this.remove();
	},

	showDetails: function (e) {
		if(e.target.className !== 'delete') {
			
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
