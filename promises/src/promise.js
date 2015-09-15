(function(global) {
	var Promz = global.Promz = function() {
		this.state = Promz.StateUtils.validStates.PENDING;
	}

	Promz.prototype = {
		transition: function () {

		}
	};

	Promz.StateUtils = (function() {
		return {
			validStates: {
				PENDING: 0,
				FULFILLED: 1,
				REJECTED: 2
			},

			isValidState: function (state) {
				return (state === this.validStates.PENDING ||
					 			state === this.validStates.FULFILLED ||
								state === this.validStates.REJECTED) 
			}
		}
	})();

	Promz.Utils = (function () {
		return {
			runAsync: function (fn) {
				setTimeout(fn, 0);
			},

			isFunction: function (val) {
				return (val && typeof val === 'function')
			},

			isObject: function (val) {
				return (val && typeof val === 'object');
			},

			isPromise: function (val) {
				return (val && val instanceof Promz);
			}
		}
	})();
})(self);