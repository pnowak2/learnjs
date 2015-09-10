define(function(require) {
	var Backbone = require('backbone'),
			createBookTemplate = require('text!templates/createBook.html')
			_ = require('underscore'),
			ENTER_KEY = 13,

			CreateBookView = Backbone.View.extend({
				template: _.template(createBookTemplate),

				events: {
					'click button': 'createButtonClicked',
					'keyup input': 'enterKeyPressed'
				},

				initialize: function () {
					Backbone.listenTo(Backbone, 'book:error', _.bind(this.bookError));
					Backbone.listenTo(Backbone, 'book:success', _.bind(this.bookSuccess));
				},

				bookError: function (message) {
					this.$('.error-message').text(message);
				},

				bookSuccess: function () {
					this.$('.error-message').empty();
				},

				createButtonClicked: function() {
					var bookTitle = this.$('input').val();
					Backbone.trigger('book:create', bookTitle);
					this.$('input').val('').focus();
				},

				enterKeyPressed: function (e) {
					if(e.which === ENTER_KEY) {
						this.createButtonClicked();
					}
				},

				render: function () {
					this.$el.html(this.template());
					return this;
				}
			});

	return CreateBookView;
});