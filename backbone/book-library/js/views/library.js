var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',

	initialize: function () {
		this.render();
		this.collection = new app.Library();
	},

	render: function () {
		return this;
	}
});