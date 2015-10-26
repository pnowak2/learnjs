define(function(require) {
  var eventBus = require('../../../core/eventBus'),
    _ = require('underscore');

  return _.create(eventBus);
});