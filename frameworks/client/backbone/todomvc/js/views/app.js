var app = app || {};

app.AppView = Backbone.View.extend({
	el: '.todoapp',

	statsTemplate: _.template($('#stats-template').html()),

	initialize: function () {
		this.allCheckbox = this.$('.toggle-all');
		this.$input = this.$('.new-todo');
		this.$footer = this.$('.footer');
		this.$main = this.$('.main');
		this.$list = this.$('.todo-list');

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
	},

	addOne: function (todo) {
		var view = this.createTodoItemView(todo);
		this.$list.append(view.render().el);
	},

	addAll: function () {
		app.todos.forEach(this.addOne, this);
	},

	createTodoItemView: function (todo) {
		return new Backbone.View();
	}
});
