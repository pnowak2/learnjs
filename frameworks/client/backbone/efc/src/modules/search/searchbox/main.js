define(function (require) {
  var Module = require('app/core/module'),
      SearchboxView = require('app/modules/search/searchbox/views/searchboxView'),
      searchboxView = new SearchboxView;

  return Module.extend({
    view: searchboxView,

    initialize: function () {
      this.listenTo(searchboxView, 'searchbox:keyword', function (searchCriteria) {
        this.trigger('searchbox:keyword', searchCriteria);
      });

      this.listenTo(searchboxView, 'searchbox:invalid', function (errorMessage) {
        this.trigger('searchbox:invalid', errorMessage);
      });
    }
  });
});