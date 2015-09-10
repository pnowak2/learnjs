define(['jquery', 
				'app/views/libraryView', 
				'app/views/createBookView',
				'app/collections/libraryCollection'
			 ], 
				function ($, 
									LibraryView, 
									CreateBookView,
									LibraryCollection) {
	var app = {},
			libraryView = new LibraryView({
				collection: new LibraryCollection([
					{ title: 'test' },
					{ title: 'other' },
					{ title: 'redundant' }
				])
			}),
			createBookView = new CreateBookView;

	createBookView.render();
	libraryView.render();

	$('#form').append(createBookView.el);
	$('#library').append(libraryView.el);

	return app;
});
