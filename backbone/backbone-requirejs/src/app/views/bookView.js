define(function(require) {
	var Backbone = require('backbone'),
			Mustache = require('mustache'),
			bookTemplate = require('text!templates/book.html'),
			_ = require('underscore'),
			BookView = Backbone.View.extend({
				tagName: 'li',

				events: {
					'click input[type=checkbox]': 'itemClicked',
					'click .title': 'editClicked',
					'click button': 'removeClicked',
					'keydown .edit-title': 'editTitleKeyPressed'
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

				editClicked: function (e) {
					this.$el.toggleClass('edit');
					this.$('.edit-title').focus();
				},

				editTitleKeyPressed: function (e) {
					if(e.which === 13) {
						this.model.set('title', this.$('.edit-title').val(), {validate: true});
						this.$el.toggleClass('edit');
					}
				},

				removeClicked: function (e) {
					this.model.destroy();
					this.remove();
				},

				render: function () {
					var html = Mustache.render(bookTemplate, this.model.toJSON());
					this.$el.html(html);
					return this;
				}
			});

	return BookView;
});