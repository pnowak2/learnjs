define(function (require) {
  var Widget = require('../../../core/widget'),
      SearchboxView = require('./views/searchboxView'),
      searchboxView = new SearchboxView;

  return Widget.extend({

    view: searchboxView,

    initialize: function () {
      this.listenTo(searchboxView, 'searchbox:keyword', function (searchCriteria) {
        this.trigger('searchbox:keyword', searchCriteria);
      });

      this.listenTo(searchboxView, 'searchbox:invalid', function (errorMessage) {
        this.trigger('searchbox:invalid', errorMessage);
      });
    },

    render: function () {
      searchboxView.render();
      return this;
    }
  });
});