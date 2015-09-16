(function(global) {
	var Promz = global.Promz = function() {
		this.state = Promz.StateUtils.validStates.PENDING;
		this.value = null;
		this.queue = [];
		this.handlers = {
			fulfill: null,
			reject: null
		};
	}

	Promz.prototype = {
		transition: function (state, value) {
			if(this.state === state ||
				 this.state !== Promz.StateUtils.validStates.PENDING ||
				 !Promz.StateUtils.isValidState(state) ||
				 arguments.length > 2) {
				return;
			}

			this.state = state;
			this.value = value;

			this.process();
		},

		then: function (onFulfilled, onRejected) {
			var queuedPromz = new Promz();

			if(Promz.Utils.isFunction(onFulfilled)) {
				this.handlers.fulfill = onFulfilled;
			}
			
			if(Promz.Utils.isFunction(onRejected)) {
				this.handlers.reject = onRejected;
			}
			
			this.process();

			return queuedPromz;
		},

		process: function () {

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