describe('Router', function() {

	var Router = Backbone.Router.extend({
			routes: {
				'about': 'showAbout',
				'todo/:id': 'getTodo',
				'search/:query/p:page': 'searchTodos',
				'todos/:id/download/*documentPath': 'downloadDocument',
				'optional(/:param)': 'optionalItem',
				'*other': 'defaultRoute'
			},
			showAbout: jasmine.createSpy(),
			getTodo: jasmine.createSpy(),
			searchTodos: jasmine.createSpy(),
			downloadDocument: jasmine.createSpy(),
			optionalItem: jasmine.createSpy(),
			defaultRoute: jasmine.createSpy()
		}),
		router = new Router();

		Backbone.history.start();

	afterEach(function () {
		router.navigate('');
		router.showAbout.calls.reset();
		router.getTodo.calls.reset();
		router.searchTodos.calls.reset();
		router.downloadDocument.calls.reset();
		router.defaultRoute.calls.reset();
		router.optionalItem.calls.reset();
	});

	it('should call callback when trigger appropriate url', function() {
		router.navigate('about', { trigger: true });
		expect(router.showAbout).toHaveBeenCalled();
	});

	it('should call callback with one parameter', function() {
		router.navigate('todo/2', { trigger: true });
		expect(router.getTodo).toHaveBeenCalled();
		expect(router.getTodo.calls.mostRecent().args[0]).toBe('2');
	});

	it('should call callback with two parameters', function() {
		router.navigate('search/valor/p2', { trigger: true });
		expect(router.searchTodos).toHaveBeenCalled();
		expect(router.searchTodos.calls.mostRecent().args[0]).toBe('valor');
		expect(router.searchTodos.calls.mostRecent().args[1]).toBe('2');
	});

	it('should call callback with splat', function() {
		router.navigate('todos/5/download/logo.png', { trigger: true });
		expect(router.downloadDocument).toHaveBeenCalled();
		expect(router.downloadDocument.calls.mostRecent().args[0]).toBe('5');
		expect(router.downloadDocument.calls.mostRecent().args[1]).toBe('logo.png');
	});

	it('should call optional route', function() {
		router.navigate('optional', { trigger: true });
		expect(router.optionalItem).toHaveBeenCalled();
	});

	it('should call optional route with param', function() {
		router.navigate('optional/2', { trigger: true });
		expect(router.optionalItem).toHaveBeenCalled();
		expect(router.optionalItem.calls.mostRecent().args[0]).toBe('2');
	});

	it('should call default route', function() {
		router.navigate('other', { trigger: true });
		expect(router.defaultRoute).toHaveBeenCalled();
	});

	it('should listen to "route" event', function() {
		var routeSpy = jasmine.createSpy();

		router.on('route', routeSpy);
		router.navigate('todo/2', { trigger: true });

		expect(routeSpy).toHaveBeenCalled();
		expect(routeSpy.calls.mostRecent().args[0]).toBe('getTodo');
		expect(routeSpy.calls.mostRecent().args[1]).toContain('2');
	});
});