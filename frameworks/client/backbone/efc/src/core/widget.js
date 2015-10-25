define(function (require) {
  var Module = require('app/core/module');

  return Module.extend({
    render: function () { return this; },
    $el: null
  });
});