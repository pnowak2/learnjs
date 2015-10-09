describe('View', function() {
	it('should be defined', function() {
		var SearchView = Backbone.View.extend({

		});

		expect(SearchView).toEqual(jasmine.any(Function));
	});

	it('should have this.el defined', function() {
		var SearchView = Backbone.View.extend({
			id: 'searchId',
			tagName: 'ul',
			className: 'searchClass',

			render: function () {
				
			}
		}),
		searchView = new SearchView();

		expect(searchView.el).toBeDefined();
	});

	it('should use id, tagName and class properties', function() {
		var SearchView = Backbone.View.extend({
			id: 'searchId',
			tagName: 'ul',
			className: 'searchClass'
		}),
		searchView = new SearchView();

		expect(searchView.tagName).toBe('ul');
		expect(searchView.className).toBe('searchClass');
		expect(searchView.id).toBe('searchId');

		expect(searchView.el).toBeMatchedBy('ul.searchClass#searchId');
	});

	it('should not invoke render by default', function() {
		var SearchView = Backbone.View.extend({
			id: 'searchId',
			tagName: 'ul',
			className: 'searchClass',

			render: jasmine.createSpy()
		}),
		searchView = new SearchView();

		expect(searchView.render).not.toHaveBeenCalled();
	});

	it('should use templating engine', function() {
		var SearchView = Backbone.View.extend({
			template: _.template('<p><%= name %></p>'),

			render: function () {
				var html = this.template({ name: 'hello world' });
				this.$el.html(html);
				return this;
			}
		}),
		searchView = new SearchView();

		expect(searchView.render().el).toContainHtml('<p>hello world</p>');
	});

	it('should define events in string form', function() {
		var SearchView = Backbone.View.extend({
			template: _.template('<button>test</button>'),

			render: function () {
				var html = this.template({});
				this.$el.html(html);
				return this;
			},
			events: {
				'click button': 'buttonClicked'
			},

			buttonClicked: jasmine.createSpy()
		}),
		searchView = new SearchView();

		searchView.render().$('button').click();

		expect(searchView.buttonClicked).toHaveBeenCalled();
	});

	it('should define events in object form', function() {
		var spy = jasmine.createSpy(),
		SearchView = Backbone.View.extend({
			events: {
				click: spy
			}
		}),
		searchView = new SearchView();

		searchView.el.click();
		
		expect(spy).toHaveBeenCalled();
	});

	it('should use el with existing element in DOM', function() {
		setFixtures('<div id="existsInDOM"></div>');

		var SearchView = Backbone.View.extend({
			el: '#existsInDOM',
			initialize: function () {
				this.render();
			},
			render: function () {
				this.$el.html('<div>done by backbone</div>');
			}
		}),
		searchView = new SearchView();

		expect($('#existsInDOM')).toContainHtml('<div>done by backbone</div>');
	});

	it('should use $el property as $(view.el)', function() {
		var SearchView = Backbone.View.extend({ }),
		searchView = new SearchView();

		expect(searchView.$el).toEqual($(searchView.el));
	});

	it('should use view.$ to find descendand elements like $(this.el).find()', function() {
		setFixtures('<p class="desc"></p>');

		var SearchView = Backbone.View.extend({ 
			initialize: function () {
				this.render();
			},
			render: function () {
				this.$el.html('<div><p class="desc"></p></div>');
			}
		}),
		searchView = new SearchView();

		expect(searchView.$('.desc').length).toBe(1);
	});

	it('should use setElement() method', function() {
		var button1 = $('<button></button>');
		var button2 = $('<button></button>');
		var spy = jasmine.createSpy();

		var SearchView = Backbone.View.extend({
			el: button1,
			events: {
				click: spy
			}
		}),

		searchView = new SearchView();

		expect(searchView.$el).toBe(button1);

		button1.trigger('click');

		expect(spy).toHaveBeenCalled();
		expect(spy.calls.count()).toBe(1);

		searchView.setElement(button2);

		button1.trigger('click');
		expect(spy.calls.count()).toBe(1);
		
		button2.trigger('click');
		expect(spy.calls.count()).toBe(2);
	});
});