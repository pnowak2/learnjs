define(function (require) {
  var ApplicationModule = require('app/modules/application/main'),
    appEventBus = require('app/events/appEventBus'),
    $ = require('jquery');

  var setupApplicationEvents = function () {
    $(document)
      .ajaxStart(function () {
        appEventBus.trigger('app:busy:start');
      }).ajaxStop(function () {
        appEventBus.trigger('app:busy:stop');
      });
  }

  return {
    initialize: function () {
      setupApplicationEvents();
      var applicationModule = new ApplicationModule;
    }
  };
});
