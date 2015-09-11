var Backbone = require('backbone'),
		TodoModel = require('./models/todoModel'),
		TodoView = require('./views/todoView'),
		$ = require('jquery');

$(function () {
	var todo = new TodoModel({
		title: 'freshly created'
	});
	$('body').html(new TodoView({
		model: todo
	}).render().el);
});