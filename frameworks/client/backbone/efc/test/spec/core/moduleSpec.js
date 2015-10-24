define(function(require) {

	var Module = require('app/core/module'),
			utils = require('app/utils/utils'),
			_ = require('underscore'),
			Backbone = require('backbone');

  describe('Module', function() {
      it('should be defined', function() {
      	expect(Module).toEqual(jasmine.any(Function));
      });

      it('should have backbone events mixed in', function() {
      	var moduleKeys = _.keys(Module.prototype),
      			backboneEventKeys = _.keys(Backbone.Events);

      	_.each(backboneEventKeys, function (backboneEventKey) {
      		expect(moduleKeys).toContain(backboneEventKey);
      	});
      });

      it('should have default initialize method', function() {
      	expect(Module.prototype.initialize).toBeDefined();
      });

      it('should have default view property', function() {
      	expect(Module.prototype.view).toEqual(jasmine.any(Backbone.View));
      });

      it('should be extensible', function() {
      	expect(Module.extend).toBe(utils.extend);
      });

      it('should call initialize on instantiate', function() {
      	spyOn(Module.prototype, 'initialize');
      	expect(Module.prototype.initialize).not.toHaveBeenCalled();

      	new Module;

      	expect(Module.prototype.initialize).toHaveBeenCalled();
      });
  });

	describe('Module extension', function() {
		it('should be possible', function() {
			var spy = jasmine.createSpy();
			var ExtendedModule = Module.extend({
				initialize: spy
			});
			expect(ExtendedModule).toEqual(jasmine.any(Function));

			var extModule = new ExtendedModule('a', 'b', 'c');

			expect(spy.calls.count()).toBe(1);
			expect(spy.calls.argsFor(0)).toEqual(['a', 'b', 'c']);
		});
	});
});