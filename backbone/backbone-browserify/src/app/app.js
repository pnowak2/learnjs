var Backbone = require('backbone'),
		TodoView = require('./views/todoView'),
		$ = require('jquery');

Backbone.$ = $;
$(function () {
	$('body').html(new TodoView().render().el);
});