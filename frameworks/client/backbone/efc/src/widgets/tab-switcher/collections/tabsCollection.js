define(function (require) {
  var Backbone = require('backbone'),
      TabModel = require('../models/tabModel');

  return Backbone.Collection.extend({
    model: TabModel
  });
});