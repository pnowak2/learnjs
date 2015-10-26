define(function(require) {

  var Backbone = require('backbone'),
    SearchCriteriaModel = require('app/widgets/search/searchbox/models/searchCriteriaModel');

  describe('SearchCriteriaModel', function() {
    it('should be defined', function() {
      expect(SearchCriteriaModel.prototype).toEqual(jasmine.any(Backbone.Model));
    });

    it('should have correct defaults', function() {
      expect(SearchCriteriaModel.prototype.defaults).toEqual({
        keyword: ''
      })
    });
  });

});