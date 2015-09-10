define(function(require) {
	var Backbone = require('backbone'),
			createBookTemplate = require('text!templates/createBook.html'),
			_ = require('underscore'),
			Mustache = require('mustache'),
			ENTER_KEY = 13,
			CreateBookView = Backbone.View.extend({

				events: {
					'click button': 'createButtonClicked',
					'keyup input': 'keyPressed'
				},

				bookSuccess: function () {
					this.$('.error-message').empty();
				},

				bookError: function (message) {
					this.$('.error-message').text(message);
				},

				createButtonClicked: function() {
					var bookTitle = this.$('input').val();
					this.trigger('book:create', bookTitle);
					this.$('input').val('').focus();
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
						buttonTitle: 'New Book'
					}));
					return this;
				}
			});

	return CreateBookView;
});