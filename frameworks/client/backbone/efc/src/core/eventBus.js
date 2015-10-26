define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    eventBus = {};

  _.extend(eventBus, Backbone.Events);

  return eventBus;
});