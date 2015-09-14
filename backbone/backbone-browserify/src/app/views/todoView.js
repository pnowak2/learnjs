var Backbone = require('backbone'),
	template = require('../templates/todo.hbs');

module.exports = Backbone.View.extend({
	tagName: 'p',

	tpl: template,

	initialize: function() {
		this.listenTo(this.model, 'change', this.render.bind(this));
	},

	events: {
		'click': 'clicked'
	},

	clicked: function() {
		this.model.set('title', Math.random());
	},

	render: function() {
		var html = this.tpl(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});