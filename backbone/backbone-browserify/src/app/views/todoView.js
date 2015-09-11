var Backbone = require('backbone');

module.exports = Backbone.View.extend({
	tagName: 'p',
	
	render: function () {
		this.$el.html('hello world');
		return this;
	}
});