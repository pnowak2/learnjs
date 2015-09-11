var Backbone = require('backbone'),
		TodoModel = require('./models/todoModel'),
		TodoView = require('./views/todoView'),
		$ = require('jquery');

Backbone.$ = $;
$(function () {

	var todo = new TodoModel;
	$('body').html(new TodoView({
		model: todo
	}).render().el);
});