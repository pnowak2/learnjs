var Backbone = require('backbone');

module.exports = Backbone.View.extend({
	tagName: 'p',

	initialize: function () {
		this.listenTo(this.model, 'change', this.render.bind(this));
	},

	events: {
		'click': 'clicked'
	},

	clicked: function () {
		this.model.set('title', Math.random());
	},

	render: function () {
		this.$el.html(this.model.get('title'));
		return this;
	}
});