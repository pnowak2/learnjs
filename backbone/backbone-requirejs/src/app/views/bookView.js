define(function(require) {
	var Backbone = require('backbone'),
			_ = require('underscore'),
			BookView = Backbone.View.extend({
				tagName: 'li',
				template: _.template('<%= title %>'),

				events: {
					'click': 'itemClicked'
				},

				initialize: function () {
					this.listenTo(this.model, 'change', _.bind(this.modelChanged, this));
				},

				modelChanged: function (model) {
					this.$el.toggleClass('done', model.get('completed'));
					this.trigger('book:change');
				},

				itemClicked: function (e) {
					this.model.toggle();
				},

				render: function () {
					var html = this.template(this.model.toJSON());
					this.$el.html(html);
					this.modelChanged(this.model);
					return this;
				}
			});

	return BookView;
});