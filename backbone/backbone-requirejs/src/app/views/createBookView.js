define(function(require) {
	var Backbone = require('backbone'),
			createBookTemplate = require('text!templates/createBook.html'),
			_ = require('underscore'),
			Mustache = require('mustache'),
			ENTER_KEY = 13,
			CreateBookView = Backbone.View.extend({

				events: {
					'click button.book-submit': 'createButtonClicked',
					'click button.book-remove-all': 'removeAllButtonClicked',
					'keydown input': 'keyPressed'
				},

				initialize: function () {
					this.listenTo(this.collection, 'all', _.bind(this.bookChanged, this));
				},

				bookSuccess: function () {
					this.$('.error-message').empty();
				},

				bookError: function (message) {
					this.$('.error-message').text(message);
				},

				bookChanged: function () {
					this.render();
				},

				createButtonClicked: function() {
					var bookTitle = this.$('input').val();
					this.trigger('book:create', bookTitle);
					this.$('input').val('').focus();
				},

				removeAllButtonClicked: function() {
					this.trigger('book:remove-all');
				},

				keyPressed: function (e) {
					console.log('pressed')
					if(e.which === ENTER_KEY) {
						this.createButtonClicked();
					} else {
						this.$('.error-message').empty();
					}
				},

				render: function () {
					this.$el.html(Mustache.render(createBookTemplate, {
						buttonTitle: 'New Book',
						hasCompleted: this.collection.completed().length > 0
					}));
					return this;
				}
			});

	return CreateBookView;
});