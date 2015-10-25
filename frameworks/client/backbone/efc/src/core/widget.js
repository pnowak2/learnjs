define(function (require) {
  var Module = require('./module'),
  		$ = require('jquery');

  return Module.extend({

    render: function () { 
    	return this; 
    },

    remove: function () {
    	if(this.view) {
    		this.view.remove();
    	}
    },

    view: null
  });
});