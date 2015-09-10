define(function(require) {
	var Backbone = require('backbone'),
			Mustache = require('mustache'),
			bookTemplate = require('text!templates/book.html'),
			_ = require('underscore'),
			BookView = Backbone.View.extend({
				tagName: 'li',

				events: {
					'click': 'itemClicked'
				},

				initialize: function () {
					this.listenTo(this.model, 'change', _.bind(this.modelChanged, this));
				},

				modelChanged: function (model) {
					this.render();
					this.trigger('book:change');
				},

				itemClicked: function (e) {
					this.model.toggle();
				},

				render: function () {
					var html = Mustache.render(bookTemplate, this.model.toJSON());
					this.$el.html(html);
					return this;
				}
			});

	return BookView;
});