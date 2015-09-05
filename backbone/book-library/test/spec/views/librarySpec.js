describe('Library View', function() {
	var viewPrototype = app.LibraryView.prototype;

	describe('Constructor', function() {
		it('should exist', function() {
			expect(viewPrototype).toEqual(jasmine.any(Backbone.View));
		});
	});

	describe('View Element', function() {
		it('should be linked with existing element in DOM', function() {
			expect(viewPrototype.el).toBe('#books');
		});
	});

	describe('Initialize', function() {
		it('should be defined', function() {
			expect(app.LibraryView.prototype.hasOwnProperty('initialize')).toBe(true);
		});

		it('should render', function() {
			spyOn(app.LibraryView.prototype, 'render');

			expect(app.LibraryView.prototype.render).not.toHaveBeenCalled();
			
			var view = new app.LibraryView;

			expect(view.render).toHaveBeenCalled();
			expect(view.render.calls.count()).toBe(1);
		});

		it('should initialize collection', function() {
			var view = new app.LibraryView;
			expect(view.collection).toEqual(jasmine.any(app.Library));
			expect(view.collection.size()).toBe(0);
		});
	});

	describe('Render', function() {
		var view;

		beforeEach(function () {
			view = new app.LibraryView;
		});

		it('should return view object itself', function() {
			expect(view.render()).toBe(view);
		});

	});

});
