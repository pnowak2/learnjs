define(function (require) {
  var Backbone = require('backbone'),
      TabModel = require('app/modules/tab-switcher/models/tabModel');

  return Backbone.Collection.extend({
    model: TabModel
  });
});