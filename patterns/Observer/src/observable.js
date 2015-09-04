(function () {

  function _observers(observable, event) {
    var result = [],
      observers = observable.observers || {};

    observable.observers = observable.observers || {};
    if (event === void 0) {
      for (evt in observers) {
        for (o in observers[evt]) {
          if (observers[evt].hasOwnProperty(o)) {
            result.push(observers[evt][o]);
          }
        }
      }
    } else {
      result = observable.observers[event] = observable.observers[event] || [];
    }

    return result || [];
  }

  var observe = function (event, observer) {

    if (typeof observer != "function") {
      throw new TypeError("observer is not function");
    }

    if (!event) {
      throw new Error("Event name not provided");
    }

    _observers(this, event).push(observer);
  }

  var notify = function (event) {
    var observers = _observers(this, event);
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < observers.length; i += 1) {
      try {
        observers[i].apply(this, args);
      } catch (e) {}
    }
  }

  var hasObserver = function (event, observer) {

    var observers = _observers(this, event);

    for (var i = 0, l = observers.length; i < l; i += 1) {
      if (observers[i] === observer) {
        return true;
      }
    }
    return false;
  }

  tddjs.namespace("util").observable = {
    observe: observe,
    hasObserver: hasObserver,
    notify: notify
  };

})();