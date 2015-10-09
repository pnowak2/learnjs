describe('Todo Collection', function() {
	describe('Constructor', function() {
		it('should be defined', function() {
			expect(app.TodoList).toEqual(jasmine.any(Function));
		});

		it('should be Backbone.Collection', function() {
			expect(app.TodoList.prototype instanceof Backbone.Collection).toBeTruthy();
		});
	});

	describe('Methods and Attributes', function() {
		var todoList,
				one = new app.Todo({
					title: 'one',
					completed: true
				}),
				two = new app.Todo({
					title: 'two',
					completed: false
				}),
				three = new app.Todo({
					title: 'three',
					completed: true
				}),
				modelsArray = [one, two, three];

		beforeEach(function () {
			todoList = new app.TodoList();
		});

		it('should have model set', function() {
			expect(todoList.model).toBe(app.Todo);
		});

		it('should use localStorage', function() {
			expect(todoList.localStorage instanceof Backbone.LocalStorage).toBe(true);
		});

		it('should have completed() method', function() {
			expect(todoList.completed).toEqual(jasmine.any(Function));
		});

		it('should have completed() to return completed items', function() {
			todoList = new app.TodoList(modelsArray);
			expect(todoList.completed()).toEqual([one, three]);
		});

		it('should have remaining() to return not completed items', function() {
			todoList = new app.TodoList(modelsArray);
			expect(todoList.remaining()).toEqual([two]);
		});

		it('should have nextOrder() to produce incremental id', function() {
			expect(todoList.nextOrder).toEqual(jasmine.any(Function));
		});

		it('should produce proper nextOrder', function() {
			expect(todoList.isEmpty()).toBe(true);
			expect(todoList.nextOrder()).toBe(1);

			todoList.add(one);

			expect(todoList.nextOrder()).toBe(2);

			todoList.add(two);

			expect(todoList.nextOrder()).toBe(3);

			todoList.reset();

			expect(todoList.nextOrder()).toBe(1);
		});

		it('should define comparator for items', function() {
			var itemSpy = {
						get: function () { return 'value' }
					},
					comparatorResult;

			spyOn(itemSpy, 'get').and.callThrough();

			expect(todoList.comparator).toEqual(jasmine.any(Function));

			comparatorResult = todoList.comparator(itemSpy);

			expect(itemSpy.get).toHaveBeenCalledWith('order');
			expect(comparatorResult).toBe('value');
		});
	});
});
