(function(global) {

  var Promz = function(func) {
  	this.func = func;

	  if(this.func) {
  		this.func.call();
		}
  }

  Promz.create = function (func) {
  	return new Promz(func);
  }

  Promz.prototype = {
  	then: function (nextFunc) {
  		return Promz.create(nextFunc);
  	}
  }

  global.Promz = Promz;
})(self);