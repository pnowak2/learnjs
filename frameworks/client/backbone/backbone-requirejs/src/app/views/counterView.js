define(['backbone', 
				'mustache',
				'text!templates/counter.html'], 
				function (Backbone, 
									Mustache,
									counterTemplate) {

	var CounterView = Backbone.View.extend({

		initialize: function () {
			this.listenTo(this.collection, 'all', _.bind(this.bookChanged, this));
		},

		bookChanged: function (book) {
			this.render();
		},

		render: function () {
			var html = Mustache.render(counterTemplate, {
				total: this.collection.size(),
				completed: this.collection.completed().length,
				remaining: this.collection.remaining().length
			});
			this.$el.html(html);

			return this;
		}
	});

	return CounterView;
});