describe('Todo Model', function() {

	describe('Constructor', function() {
		it('should be defined', function() {
			expect(app.Todo).toEqual(jasmine.any(Function));
		});

		it('should be Backbone.Model', function() {
			expect(app.Todo.prototype instanceof Backbone.Model).toBeTruthy();
		});
	});

	describe('Methods and Attributes', function() {
		var todo;

		beforeEach(function () {
			todo = new app.Todo();
		});

		it('should have defaults property defined', function() {
			expect(todo.defaults).toBeDefined();
		});

		it('should have default properties set', function() {
			expect(todo.get('title')).toBe('');
			expect(todo.get('completed')).toBe(false);
		});

		it('should have toggle method', function() {
			expect(todo.toggle).toEqual(jasmine.any(Function));
		});

		it('should toggle the completed field', function() {
			spyOn(todo, 'save');
			
			expect(todo.save).not.toHaveBeenCalled();

			todo.toggle();
			
			expect(todo.save).toHaveBeenCalledWith({
				completed: true
			});
		});
	});
});