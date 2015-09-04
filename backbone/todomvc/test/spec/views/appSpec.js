describe('Application View', function() {

	var appView, appViewWithCollection, todo;

	beforeEach(function () {
		loadFixtures('app-view-fixture.html');

		todo = new app.Todo({ title: 'test'	});

		appView = new app.AppView();
		appViewWithCollection = new app.AppView({
			collection: app.todos
		});
	});

	afterEach(function () {
		appView = null;
		appViewWithCollection = null;
	});

	describe('Constructor', function() {
		it('should be defined', function() {
			expect(app.AppView).toEqual(jasmine.any(Function));
		});

		it('should be Backbone.View', function() {
			expect(app.AppView.prototype).toEqual(jasmine.any(Backbone.View));
		});

		it('should have initialize constructor', function() {
			expect(app.AppView.prototype.hasOwnProperty('initialize')).toBe(true);
		});
	});

	describe('Html elements and templates', function() {
		it('should have el defined', function() {
			expect(appView.el).toEqual('.todoapp');
		});

		it('should have statsTemplate defined', function() {
			expect(appView.statsTemplate).toEqual(jasmine.any(Function));
			expect(appView.statsTemplate()).toEqual(jasmine.any(String));
		});

		it('should have input element', function() {
			expect(appView.$input).toBeMatchedBy('input.new-todo');
		});

		it('should have footer element', function() {
			expect(appView.$footer).toBeMatchedBy('footer.footer');
		});

		it('should have list element', function() {
			expect(appView.$list).toBeMatchedBy('ul.todo-list');
		});

		it('should have allCheckbox element', function() {
			expect(appView.allCheckbox).toBeMatchedBy('input[type=checkbox]');
		});

		it('should have main element', function() {
			expect(appView.$main).toBeMatchedBy('section.main');
		});
	});

	describe('Event handling', function() {
		beforeEach(function () {
			spyOn(app.AppView.prototype, 'addOne').and.callThrough();
			spyOn(app.AppView.prototype, 'addAll').and.callThrough();
			spyOn(app.AppView.prototype, 'createTodoItemView').and.callThrough();

			appViewWithCollection = new app.AppView({
				collection: app.todos
			});
		});

		afterEach(function () {
			app.AppView.prototype.addOne.calls.reset();
			app.AppView.prototype.addAll.calls.reset();
			app.AppView.prototype.createTodoItemView.calls.reset();
		});

		it('should have addOne handler', function() {
			expect(appViewWithCollection.addOne).toEqual(jasmine.any(Function));
		});

		it('should have addAll handler', function() {
			expect(appViewWithCollection.addAll).toEqual(jasmine.any(Function));
		});

		it('should listen to todos collection add event', function() {
			expect(appViewWithCollection.addOne).not.toHaveBeenCalled();

			app.todos.add(todo);

			expect(appViewWithCollection.addOne).toHaveBeenCalled();
			expect(appViewWithCollection.addOne.calls.mostRecent().args[0]).toBe(todo);
		});

		it('should listen to todos collection reset event', function() {
			expect(appViewWithCollection.addAll).not.toHaveBeenCalled();

			app.todos.reset([todo]);

			expect(appViewWithCollection.addAll).toHaveBeenCalled();		
			expect(appViewWithCollection.addOne.calls.count()).toBe(1);		
		});
	});

	describe('Rendering', function() {
		beforeEach(function () {
			spyOn(app.AppView.prototype, 'createTodoItemView').and.callThrough();
		});

		afterEach(function () {
			app.AppView.prototype.createTodoItemView.calls.reset();
		});

		it('should call todoItemView inside the list', function() {
			app.todos.add(todo);
			expect(appViewWithCollection.createTodoItemView).toHaveBeenCalledWith(todo);
		});

		it('should return Backbone.View', function() {
			var itemView = appViewWithCollection.createTodoItemView(todo);
			expect(itemView).toEqual(jasmine.any(Backbone.View));
		});
	});
});
