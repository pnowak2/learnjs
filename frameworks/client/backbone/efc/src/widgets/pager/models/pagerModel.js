define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      total: 0,
      pageSize: 10
    }
  });
});