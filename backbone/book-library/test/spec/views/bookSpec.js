describe('Book View', function() {

	var viewPrototype = app.BookView.prototype;

	describe('Constructor', function() {
		it('should exist', function() {
			expect(viewPrototype).toEqual(jasmine.any(Backbone.View));
		});
	});

	describe('View Element', function() {
		it('should be a div', function() {
			expect(viewPrototype.tagName).toBe('div');
		});

		it('should have class name', function() {
			expect(viewPrototype.className).toBe('bookContainer');
		});
	});

	describe('Template', function() {
		var view;

		beforeEach(function () {
			view = new app.BookView;
		});

		it('should provide book template html', function() {
			setFixtures('<div id="bookTemplate">book template</div>');
			expect(view.template()()).toBe('book template');
		});
	});

	describe('Render', function() {
		var view;

		beforeEach(function () {
			view = new app.BookView;
			spyOn(view, 'template').and.returnValue(function () {
				return 'book template';
			});
		});

		it('should return view object itself', function() {
			expect(view.render()).toBe(view);
		});

		it('should put html to element', function() {
			view.render();
			expect(view.el).toContainHtml('book template');
		});
	});

});
