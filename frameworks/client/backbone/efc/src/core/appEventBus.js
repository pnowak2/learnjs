define(function (require) {
  var Module = require('app/core/module'),
      EventBusModule = Module.extend({
        events: {
          busy_start: 'app:busy:start',
          busy_stop: 'app:busy:stop'
        }
      });

  return new EventBusModule;
});