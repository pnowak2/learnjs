describe('Collection', function() {

	describe('Basics', function() {
		it('should be defined', function() {
			var Books = Backbone.Collection.extend({});

			expect(Books).toEqual(jasmine.any(Function));
		});

		it('should create collection with base Model', function() {
			var Books = Backbone.Collection.extend({}),
				books = new Books({
					id: 1,
					title: 'lotr',
					author: 'tolkien'
				});

			expect(books.length).toBe(1);
			expect(books.get(1) instanceof Backbone.Model).toBeTruthy();
		});

		it('should create collection with defined model', function() {
			var Book = Backbone.Model.extend({
					defaults: {
						title: 'none',
						author: 'unknown'
					}
				}),
				Books = Backbone.Collection.extend({
					model: Book
				}),
				books = new Books([{
					id: 1,
					title: 'lotr',
					author: 'tolkien'
				}]);

			expect(books.length).toBe(1);
			expect(books.get(1) instanceof Book).toBeTruthy();
			expect(books.get(1).get('title')).toBe('lotr');
		});

		it('should add and remove items', function() {
			var Todo = Backbone.Model.extend({
					defaults: {
						title: '',
						completed: false
					}
				}),
				TodosCollection = Backbone.Collection.extend({
					model: Todo
				}),
				a = new Todo({
					title: 'fix errors'
				}),
				b = new Todo({
					title: 'go to lunch',
					completed: true
				}),
				todos = new TodosCollection([a, b]);

			expect(todos.length).toBe(2);

			todos.add({
				id: 3,
				title: 'fiesta'
			})

			expect(todos.length).toBe(3);
			expect(todos.get(3).get('title')).toBe('fiesta');

			todos.remove([a, b]);

			expect(todos.length).toBe(1);
		});

		it('should add item with merge option', function() {
			var Todo = Backbone.Model.extend({
					defaults: {
						title: '',
						completed: false
					}
				}),
				TodosCollection = Backbone.Collection.extend({
					model: Todo
				}),
				a = new Todo({
					id: 1,
					title: 'fix errors'
				}),
				b = new Todo({
					id: 2,
					title: 'go to lunch',
					completed: true
				}),
				todos = new TodosCollection([a, b]);

			todos.add({
				id: 2,
				completed: false
			})

			expect(todos.get(2).get('completed')).toBe(true);

			todos.add({
				id: 2,
				completed: false
			}, {merge: true})

			expect(todos.get(2).get('completed')).toBe(false);
		});
	});

	describe('Events', function() {
		it('should allow to listen for adding new models', function() {
			var todos = new Backbone.Collection(),
					addSpy = jasmine.createSpy();

			todos.on('add', addSpy);

			expect(addSpy).not.toHaveBeenCalled();

			todos.add({
				title: 'new title'
			})

			expect(addSpy).toHaveBeenCalled();
			expect(addSpy.calls.mostRecent().args[0].attributes).toEqual({
				title: 'new title'
			});
		});

		it('should allow to listen for changed property of model', function() {
			var todos = new Backbone.Collection(),
					changeSpy = jasmine.createSpy();

			todos.on('change:title', changeSpy);

			expect(changeSpy).not.toHaveBeenCalled();

			todos.add({
				id: 1,
				title: 'new title'
			});

			expect(changeSpy).not.toHaveBeenCalled();

			var todo = todos.get(1);

			todo.set('title', 'other');

			expect(changeSpy).toHaveBeenCalled();
		});

		it('should allow to listen for changed property of model using hashmap', function() {
			var todos = new Backbone.Collection(),
					changeSpy = jasmine.createSpy();

			todos.on({
				'change:title': changeSpy
			});

			todos.add({
				id: 1,
				title: 'new title'
			});

			expect(changeSpy).not.toHaveBeenCalled();

			var todo = todos.get(1);
			todo.set('title', 'other');

			expect(changeSpy).toHaveBeenCalled();
			expect(changeSpy.calls.mostRecent().args[0].changed).toEqual({
				title: 'other'
			});
		});
	});

	describe('Adding, reseting items', function() {
		it('Add should call add/modify/remove events on Collection.set()', function() {
			var todos = new Backbone.Collection([
						{id: 1, title: 'one'},
						{id: 2, title: 'two'},
						{id: 3, title: 'three'}
					]),
					addSpy = jasmine.createSpy(),
					changeSpy = jasmine.createSpy(),
					removeSpy = jasmine.createSpy();

			todos.on('add', addSpy);
			todos.on('change', changeSpy);
			todos.on('remove', removeSpy);

			todos.set([
				{id: 1, title: 'one modified'},
				{id: 2, title: 'two'},
				{id: 4, title: 'three'}
			]);

			expect(addSpy.calls.count()).toBe(1);
			expect(changeSpy.calls.count()).toBe(1);
			expect(removeSpy.calls.count()).toBe(1);
		});

		it('should reset coolection using Collection.reset()', function() {
			var todos = new Backbone.Collection([
						{id: 1, title: 'one'},
						{id: 2, title: 'two'},
						{id: 3, title: 'three'}
					]),
					addSpy = jasmine.createSpy(),
					changeSpy = jasmine.createSpy(),
					removeSpy = jasmine.createSpy(),
					resetSpy = jasmine.createSpy();

			todos.on('add', addSpy);
			todos.on('change', changeSpy);
			todos.on('remove', removeSpy);
			todos.on('reset', resetSpy);

			todos.reset([
				{id: 1, title: 'one modified'},
				{id: 2, title: 'two'},
				{id: 4, title: 'three'}
			]);

			expect(addSpy).not.toHaveBeenCalled();
			expect(changeSpy).not.toHaveBeenCalled();
			expect(removeSpy).not.toHaveBeenCalled();
			expect(resetSpy).toHaveBeenCalled();
		});

		it('should reset coolection using Collection.reset() with no arguments', function() {
			var todos = new Backbone.Collection([
						{id: 1, title: 'one'},
						{id: 2, title: 'two'},
						{id: 3, title: 'three'}
					]),
					addSpy = jasmine.createSpy(),
					changeSpy = jasmine.createSpy(),
					removeSpy = jasmine.createSpy(),
					resetSpy = jasmine.createSpy();

			todos.on('add', addSpy);
			todos.on('change', changeSpy);
			todos.on('remove', removeSpy);
			todos.on('reset', resetSpy);

			todos.reset();

			expect(todos.length).toBe(0);

			expect(addSpy).not.toHaveBeenCalled();
			expect(changeSpy).not.toHaveBeenCalled();
			expect(removeSpy).not.toHaveBeenCalled();
			expect(resetSpy).toHaveBeenCalled();
		});
	});

	describe('Underscore utility functions', function() {
		it('should have forEach', function() {
			var todos = new Backbone.Collection([
						{id: 0, title: 'valor'},
						{id: 1, title: 'dissemination'}
					]);

			expect(todos.forEach).toEqual(jasmine.any(Function));

			todos.forEach(function (model, i) {
				expect(model.get('title')).toBe(todos.get(i).get('title'));
			});
		});

		it('should have sortBy', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			expect(todos.sortBy).toEqual(jasmine.any(Function));
			var sorted = todos.sortBy(function (model) {
				return model.get('title').toLowerCase();
			});

			expect(sorted[0].get('title')).toBe('a');
			expect(sorted[1].get('title')).toBe('b');
			expect(sorted[2].get('title')).toBe('c');

			sorted = todos.sortBy(function (model) {
				return model.get('id');
			});

			expect(sorted[0].get('title')).toBe('c');
			expect(sorted[1].get('title')).toBe('b');
			expect(sorted[2].get('title')).toBe('a');
		});

		it('should have map', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var mapped = todos.map(function (model) {
				return model.get('id');
			});

			expect(mapped).toEqual([3, 2, 1]);
		});

		it('should have pluck', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var mapped = todos.pluck('id');

			expect(mapped).toEqual([3, 2, 1]);
		});

		it('should min/max', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var min = todos.min(function (model) {
				return model.get('id');
			});

			var max = todos.max(function (model) {
				return model.get('id');
			});

			expect(min.attributes).toEqual({
				id: 1, 
				title: 'c'
			});

			expect(max.attributes).toEqual({
				id: 3, 
				title: 'a'
			});
		});

		it('should have filter', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var filtered = todos.filter(function (model) {
				return model.get('id') > 2;
			});

			expect(filtered.length).toBe(1);
			expect(filtered[0].get('id')).toBe(3);
		});

		it('should have indexOf', function() {
			var tom = new Backbone.Model({name: 'Tom'}),
					rob = new Backbone.Model({name: 'Rob'}),
					tim = new Backbone.Model({name: 'Tim'}),
					todos = new Backbone.Collection([tom, rob, tim]);

			expect(todos.indexOf(tom)).toBe(0);
			expect(todos.indexOf(tim)).toBe(2);
			expect(todos.indexOf(rob)).toBe(1);
		});

		it('should have any()', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var bMatched = todos.any(function (model) {
				return _.contains(['b'], model.get('title'));
			});

			expect(bMatched).toBe(true);

			var dMatched = todos.any(function (model) {
				return _.contains(['d'], model.get('title'));
			});

			expect(dMatched).toBe(false);
		});

		it('should have some()', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			var bMatched = todos.some(function (model) {
				return _.contains(['b'], model.get('title'));
			});

			expect(bMatched).toBe(true);
		});

		it('should have isEmpty()', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a'},
						{id: 2, title: 'b'},
						{id: 1, title: 'c'}
					]);

			expect(todos.isEmpty()).toBeFalsy();

			todos.reset();

			expect(todos.isEmpty()).toBeTruthy();
		});

		it('should have groupBy()', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a', completed: true},
						{id: 2, title: 'b', completed: false},
						{id: 1, title: 'c', completed: true}
					]);

			var completed = todos.groupBy('completed');

			expect(completed[true].length).toBe(2);
		});

		it('should have pick()', function() {
			var todo = new Backbone.Model({
				title: 'valor',
				name: 'valito',
				age: 5
			});

			expect(todo.get('title')).toBe('valor');
			var picked = todo.pick(['age', 'title']);

			expect(picked).toEqual({
				title: 'valor',
				age: 5
			});
		});

		it('should have omit()', function() {
			var todo = new Backbone.Model({
				title: 'valor',
				name: 'valito',
				age: 5
			});

			var ommited = todo.omit('age', 'name');

			expect(ommited).toEqual({
				title: 'valor'
			});
		});

		it('should have keys() and values()', function() {
			var todo = new Backbone.Model({
				title: 'valor',
				name: 'valito',
				age: 5
			});

			expect(todo.keys()).toEqual([
					'title', 'name', 'age'
			]);

			expect(todo.values()).toEqual([
					'valor', 'valito', 5
			]);
		});

		it('should have chainable api', function() {
			var todos = new Backbone.Collection([
						{id: 3, title: 'a', completed: true},
						{id: 2, title: 'b', completed: false},
						{id: 1, title: 'c', completed: true}
					]);

			var result = todos.chain()
												.filter(function (todo) {
													return todo.get('id') > 1;
												})
												.map(function (todo) {
													return todo.get('title')
												})
												.reduce(function (initial, item) {
													return initial + item;
												})
												.value();

					expect(result).toBe('ab');
		});
	});
});
