define(function (require) {
  var Module = require('app/core/module'),
      EventBusModule = Module.extend({ });

  return new EventBusModule;
});