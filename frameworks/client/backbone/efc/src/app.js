define(function (require) {
  var Module = require('app/core/module'),
    LayoutModule = require('app/modules/layout/main'),
    appEventBus = require('app/events/appEventBus'),
    $ = require('jquery');

  var initializeEvents = function () {
    $(document)
      .ajaxStart(function () {
        appEventBus.trigger('app:busy:start');
      }).ajaxStop(function () {
        appEventBus.trigger('app:busy:stop');
      });
  }

  return Module.extend({
    initialize: function () {
      initializeEvents();
      var layoutModule = new LayoutModule;
    }
  });
});
