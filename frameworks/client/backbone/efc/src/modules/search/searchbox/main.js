define(function (require) {
  var Module = require('app/core/module'),
      SearchboxView = require('app/modules/search/searchbox/views/searchboxView'),
      searchboxView = new SearchboxView;

  return Module.extend({
    view: searchboxView,

    events: {
      search_keyword: 'searchbox:keyword',
      search_invalid: 'searchbox:invalid'
    },

    initialize: function () {
      this.listenTo(searchboxView, 'searchbox:keyword', function (searchCriteria) {
        this.trigger(this.events.search_keyword, searchCriteria);
      });

      this.listenTo(searchboxView, 'searchbox:invalid', function (errorMessage) {
        this.trigger(this.events.search_invalid, errorMessage);
      });
    }
  });
});