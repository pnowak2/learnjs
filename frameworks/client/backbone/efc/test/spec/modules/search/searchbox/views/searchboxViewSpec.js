define(function (require) {

	var Backbone = require('backbone'),
			SearchCriteriaModel = require('app/modules/search/searchbox/models/searchCriteriaModel'),
			SearchboxView = require('app/modules/search/searchbox/views/searchboxView'),
			tpl = require('text!app/modules/results/map/templates/result-map.html');

	describe('SearchboxView', function() {
		beforeEach(function () {
			this.view = new SearchboxView;
		});

		describe('prototype', function() {
			it('should be defined', function() {
				expect(SearchboxView.prototype).toEqual(jasmine.any(Backbone.View));
			});
		});

		describe('instance', function() {
			it('should have correct template', function() {
				expect(tpl).toContainElement('a.link');
			});

			it('should have model', function() {
				expect(this.view.model).toEqual(jasmine.any(Backbone.Model));
			});
		});

		describe('render', function() {
			it('should render', function() {
				spyOn(this.view.model, 'toJSON').and.returnValue({
						keyword: 'hello world'
				});

				this.view.render();

				expect(this.view.el.innerHTML).toBeMatchedBy('input[type="text"]');
			});

			it('should serialize model', function() {
				spyOn(this.view.model, 'toJSON');
				spyOn(this.view, 'template');

				expect(this.view.model.toJSON).not.toHaveBeenCalled();

				this.view.render();

				expect(this.view.model.toJSON).toHaveBeenCalled();
			});
		});
	});
	
});
