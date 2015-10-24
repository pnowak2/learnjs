define(function (require) {
  var Module = require('app/core/module'),
    LayoutModule = require('app/modules/layout/main'),
    appEventBus = require('app/core/appEventBus'),
    $ = require('jquery');

  var initializeEvents = function () {
    $(document)
      .ajaxStart(function () {
        appEventBus.trigger(appEventBus.events.busy_start);
      }).ajaxStop(function () {
        appEventBus.trigger(appEventBus.events.busy_stop);
      });
  }

  return Module.extend({
    initialize: function () {
      initializeEvents();
      var layoutModule = new LayoutModule;
    }
  });
});
