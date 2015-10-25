define(function (require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      mixins = require('./mixins');
      utils = require('./utils');

  var Module = function () {
    this.initialize.apply(this, arguments);
  }
 
  _.extend(Module.prototype, {
    initialize: function () { }
  });

  mixins.mixEvents(Module.prototype);

  Module.extend = utils.extend;

  return Module;
});