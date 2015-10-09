describe('Backbone.sync', function() {

	afterEach(function () {
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;
	});

	it('should have emulateHTTP property', function() {
		expect(Backbone.emulateHTTP).toBeDefined();
		expect(Backbone.emulateHTTP).toBe(false);
	});

	it('should have umulateJSON property', function() {
		expect(Backbone.emulateJSON).toBeDefined();
		expect(Backbone.emulateJSON).toBe(false);
	});

	it('should check emulateHTTP', function() {
		jasmine.Ajax.withMock(function() {
			var Todo = Backbone.Model.extend({
						urlRoot: '/todos'
					}),
					todo = new Todo({
						id: 1,
						title: 'test'
					}),
					request;

			Backbone.emulateHTTP = true;

			todo.save();

			request = jasmine.Ajax.requests.mostRecent()

			expect(request.method).toBe('POST');
			expect(request.requestHeaders['Content-Type']).toBe('application/json');
			expect(request.url).toBe('/todos/1');
			expect(request.data()).toEqual({
				id: 1,
				title: 'test'
			});
		});
	});

	it('should check emulateJSON', function() {
		jasmine.Ajax.withMock(function() {
			var Todo = Backbone.Model.extend({
						urlRoot: '/todos'
					}),
					todo = new Todo({
						id: 1,
						title: 'test'
					}),
					request;

			Backbone.emulateJSON = true;

			todo.save();

			request = jasmine.Ajax.requests.mostRecent()
			console.log(request);
			expect(request.method).toBe('PUT');
			expect(request.url).toBe('/todos/1');
			expect(request.requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded');
			expect(request.data()).toEqual({
				model: ['{"id":1,"title":"test"}']
			});
		});
	});

	it('should override Backbone.sync', function() {
		var Todo = Backbone.Model.extend({
					urlRoot: '/todos'
				}),
				todo = new Todo({
					id: 1,
					title: 'test'
				});

		Backbone.sync = jasmine.createSpy();

		todo.save();

		expect(Backbone.sync).toHaveBeenCalled();
		expect(Backbone.sync.calls.mostRecent().args[0]).toBe('update');
		expect(Backbone.sync.calls.mostRecent().args[1]).toBe(todo);
	});
});
