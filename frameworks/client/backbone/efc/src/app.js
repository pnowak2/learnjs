define(function(require) {
  var $ = require('jquery'),
    _ = require('underscore'),
    notificationsMixin = require('./mixins/notifications'),
    Module = require('./core/module'),

    AppModule = Module.extend({
      initialize: function() {
        var self = this;
        $(document)
          .ajaxStart(function() {
            self.trigger('app:ajax:start');
          }).ajaxStop(function() {
            self.trigger('app:ajax:stop');
          }).ajaxError(function(event, jqxhr, settings, thrownError) {
            self.trigger('app:ajax:error', event, jqxhr, settings, thrownError);
          });
      }
    }),

    appModule = new AppModule;
  _.extend(AppModule.prototype, notificationsMixin);

  return appModule;
});