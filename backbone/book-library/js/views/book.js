var app = app || {};

app.BookView = Backbone.View.extend({
	className: 'bookContainer',

	template: function () {
		return _.template($('#bookTemplate').html());
	},

	render: function () {
		this.$el.html(this.template()());
		return this;
	}
});
