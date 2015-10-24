define(function(require) {
  var Backbone = require('backbone'),
      appEventBus = require('app/core/appEventBus'),
      Router = Backbone.Router.extend({
        routes: {
          'search/:keyword': 'keywordSearch'
        },

        keywordSearch: function (keyword) {
          appEventBus.trigger('route:search', keyword);
        }
      });

  return Router;
});
