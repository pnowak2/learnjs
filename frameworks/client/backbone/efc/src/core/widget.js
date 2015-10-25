define(function (require) {
  var Module = require('./module'),
  		$ = require('jquery');

  return Module.extend({
    view: null,

    render: function () { 
      this.view.render();
      return this; 
    },

    remove: function () {
      if(this.view) {
        this.view.remove();
      }
    }
  });
});