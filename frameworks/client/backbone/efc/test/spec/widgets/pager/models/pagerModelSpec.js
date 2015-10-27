define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel');

  describe('Pager Model', function() {
    describe('prototype', function() {
      it('should be a model', function() {
        expect(PagerModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });

      it('defaults', function() {
        expect(PagerModel.prototype.defaults).toEqual({
          total: 0,
          pageSize: 10
        });
      });
    });
  });
});