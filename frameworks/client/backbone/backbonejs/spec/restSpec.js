describe('RESTful Persistence', function() {
	beforeEach(function() {
		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	var testResponses = {
		search: {
			success: {
				status: 200,
				contentType: 'application/json',
				responseText: '{ "todos": [{"id": 1, "title": "one"}, {"id": 2, "title": "two"}]}'
			},
			error: {
				status: 500
			}
		}
	}

	it('should mock the ajax facility', function() {
		var successSpy = jasmine.createSpy(),
				errorSpy = jasmine.createSpy(),
				request;

		$.ajax({
			url: '/path/query',
			method: 'post',
			dataType: 'json',
			data: {
				id: '1-id'
			},
			success: successSpy
		});

		request = jasmine.Ajax.requests.mostRecent();

		expect(request.url).toBe('/path/query');
		expect(request.method).toBe('POST');
		expect(request.data()).toEqual({
			id: ['1-id']
		});

		request.respondWith(testResponses.search.success);

		expect(successSpy).toHaveBeenCalled();
		expect(successSpy.calls.mostRecent().args[0]).toEqual({
			todos: [
				{ id: 1,	title: 'one' },	{ id: 2, title: 'two' }
			]
		});
	});

	it('should fetch collection with success', function() {
		var successSpy = jasmine.createSpy(),
				errorSpy = jasmine.createSpy(),
				Todos = Backbone.Collection.extend({
					url: '/path',
					parse: function (response) {
						return response.todos;
					}
				}),
				todos = new Todos();

		todos.fetch({
			success: successSpy,
			error: errorSpy
		});

		request = jasmine.Ajax.requests.mostRecent();

		expect(request.url).toBe('/path');
		expect(request.method).toBe('GET');

		request.respondWith(testResponses.search.success);

		expect(successSpy).toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();

		expect(todos.size()).toBe(2);

		var todo1 = todos.get(1);
		expect(todo1.attributes).toEqual({
			id: 1,
			title: 'one'
		});

		var todo2 = todos.get(2);
		expect(todo2.attributes).toEqual({
			id: 2,
			title: 'two'
		});
	});

	it('should save model to server', function() {
		var Todo = Backbone.Model.extend({
					defaults: {
						id: 1,
						title: 'none',
						completed: false
					},
				  urlRoot: '/todos'
				}),
				todo = new Todo({
						id: 1,
						title: 'first',
						completed: true
				}),
				request;

		todo.save();

		request = jasmine.Ajax.requests.mostRecent();

		expect(request.method).toBe('PUT')
		expect(request.url).toBe('/todos/1');
    expect(JSON.parse(request.params)).toEqual({
        id: 1,
        title: 'first',
        completed: true
    });
	});

	it('should patch model to server (send only changes to the server)', function() {
		var Todo = Backbone.Model.extend({
					defaults: {
						id: 1,
						title: 'none',
						completed: false
					},
				  urlRoot: '/todos'
				}),
				todo = new Todo(),
				request;

		todo.save({title: 'patched'}, {patch: true});

		request = jasmine.Ajax.requests.mostRecent();

		expect(request.method).toBe('PATCH')
		expect(request.url).toBe('/todos/1');
    expect(JSON.parse(request.params)).toEqual({
        title: 'patched'
    });
	});

	it('should delete model to server', function() {
		var Todo = Backbone.Model.extend({
				  urlRoot: '/todos'
				}),
				todo = new Todo({
						id: 1
				}),
				request;

		todo.destroy();

		request = jasmine.Ajax.requests.mostRecent();

		expect(request.method).toBe('DELETE')
		expect(request.url).toBe('/todos/1');
	});
});
