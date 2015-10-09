var app = app || {};

app.TodoList = Backbone.Collection.extend({
	model: app.Todo,

	localStorage: new Backbone.LocalStorage('todos'),

	completed: function () {
		return this.where(function (todo) {
			return todo.get('completed') === true;
		});
	},

	remaining: function () {
		return this.where(function (todo) {
			return todo.get('completed') === false;
		});
	},

	nextOrder: function () {
		return this.size() + 1;
	},

	comparator: function (todo) {
		return todo.get('order');
	}
});

