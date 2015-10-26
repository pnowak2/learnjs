define(function(require) {
  var Backbone = require('backbone'),
    app = require('../app'),
    Router = Backbone.Router.extend({
      routes: {
        'search/:keyword': 'keywordSearch'
      },

      keywordSearch: function(keyword) {
        app.trigger('app:route:search', keyword);
      }
    });

  return Router;
});