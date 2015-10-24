define(function (require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      utils = require('app/utils/utils');

  var Module = function () {
    this.initialize.apply(this, arguments);
  }
 
  _.extend(Module.prototype, Backbone.Events, {
    initialize: function () { },
    view: new Backbone.View
  });

  Module.extend = utils.extend;

  return Module;
});