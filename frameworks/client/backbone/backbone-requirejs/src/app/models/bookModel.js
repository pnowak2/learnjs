define(['jquery', 'underscore' ,'backbone'], function ($, _, Backbone) {
	var Book = Backbone.Model.extend({
		defaults: {
			title: 'no title',
			completed: false
		},

		toggle: function () {
			this.set('completed', !this.get('completed'));
		},

		validate: function (attrs) {
			if(_.isEmpty($.trim(attrs.title))) {
				return 'Title is mandatory';
			}
		}
	});

	return Book;
});
