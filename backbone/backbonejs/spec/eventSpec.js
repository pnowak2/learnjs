describe('Events', function() {

	it('should be used in global Backbone object', function() {
		var appStartSpy = jasmine.createSpy();

		Backbone.on('app:start', appStartSpy);
		Backbone.trigger('app:start');

		expect(appStartSpy).toHaveBeenCalled();
	});

	it('should do on(), off()', function() {
		var obj = _.extend(Backbone.Events),
			spy = jasmine.createSpy();

		expect(obj.on).toBeDefined();
		expect(obj.off).toBeDefined();

		obj.on('change', spy);
		obj.trigger('change', {
			some: 'data'
		});

		expect(spy).toHaveBeenCalledWith({
			some: 'data'
		});

		obj.off('change');
		obj.trigger('change');
		obj.trigger('change');
		obj.trigger('change');

		expect(spy.calls.count()).toBe(1);
	});

	it('should have once method', function() {
		var obj = _.extend(Backbone.Events, {}),
				onceSpy = jasmine.createSpy();

		obj.once('once-change', onceSpy);

		expect(onceSpy).not.toHaveBeenCalled();

		obj.trigger('once-change');
		obj.trigger('once-change');
		obj.trigger('once-change');

		expect(onceSpy).toHaveBeenCalled();
		expect(onceSpy.calls.count()).toBe(1);
	});

	it('should have "all" event', function() {
		var obj = _.extend(Backbone.Events, {}),
				allSpy = jasmine.createSpy();

		obj.on('all', allSpy);

		expect(allSpy).not.toHaveBeenCalled();

		obj.trigger('name:change');
		obj.trigger('other');
		obj.trigger('boo');

		expect(allSpy).toHaveBeenCalled();
		expect(allSpy.calls.count()).toBe(3);
	});

	it('should listenTo()', function() {
		var a = _.extend({}, Backbone.Events),
				b = _.extend({}, Backbone.Events),
				spy = jasmine.createSpy();

		a.listenTo(b, 'name:change', spy);

		b.trigger('name:change', 5);

		expect(spy).toHaveBeenCalledWith(5);

		a.stopListening(b);

		spy.calls.reset();

		b.trigger('name:change');

		expect(spy).not.toHaveBeenCalled();

	});

	it('should execute 3 types of events of View with appropriate this object', function() {
		setFixtures('<div id="todo"><button>hit me</button></div>');

		var buttonClickedSpy = jasmine.createSpy(),
				jqueryClickedSpy = jasmine.createSpy(),
				apiEventOccuredSpy = jasmine.createSpy(),
				SearchView = Backbone.View.extend({
					el: '#todo',
					events: {
						'click button': 'buttonClicked'
					},
					initialize: function () {
						this.$el.click(jqueryClickedSpy);
						this.on('apiEvent', apiEventOccuredSpy);
					},
					buttonClicked: buttonClickedSpy
				}),
				searchView = new SearchView();

		searchView.$('button').click();
		expect(buttonClickedSpy).toHaveBeenCalled();
		expect(buttonClickedSpy.calls.mostRecent().object).toBe(searchView);

		// delegated events, registers more clicks with different targets
		expect(jqueryClickedSpy.calls.count()).toBe(1);
		expect(jqueryClickedSpy.calls.mostRecent().object).toBe(searchView.el);
		searchView.$el.click();
		expect(jqueryClickedSpy.calls.count()).toBe(2);

		searchView.trigger('apiEvent');
		expect(apiEventOccuredSpy).toHaveBeenCalled();
		expect(apiEventOccuredSpy.calls.mostRecent().object).toBe(searchView);
	});
});