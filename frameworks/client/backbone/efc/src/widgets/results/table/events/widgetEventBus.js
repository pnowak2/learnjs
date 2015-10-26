define(function(require) {
  var _ = require('underscore'),
    eventBus = require('../../../../core/eventBus');

  return _.create(eventBus);
});