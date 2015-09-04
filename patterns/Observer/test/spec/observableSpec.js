describe("observable", function () {

  var observable;

  beforeEach(function () {
    observable = Object.create(tddjs.util.observable);
  });

  it("should store functions", function () {
    var observers = [
      function () {},
      function () {}
    ];

    observable.observe("event", observers[0]);
    observable.observe("event", observers[1]);

    expect(observable.hasObserver("event", observers[0])).toBeTruthy();
    expect(observable.hasObserver("event", observers[1])).toBeTruthy();
  });

  it("should return true when has observer", function () {
    var observer = function () {};
    observable.observe("event", observer);

    expect(observable.hasObserver("event", observer)).toBeTruthy();
  });

  it("should return false when no observers", function () {
    expect(observable.hasObserver("event", function () {})).toBeFalsy();
  });

  it("should call all observers", function () {
    var observer1 = jasmine.createSpy("observer1");
    var observer2 = jasmine.createSpy("observer2");

    observable.observe("event", observer1);
    observable.observe("event", observer2);

    observable.notify("event");

    expect(observer1).toHaveBeenCalled();
    expect(observer2).toHaveBeenCalled();

  });

  it("should pass through arguments", function () {
    var observer = jasmine.createSpy("observer");
    observable.observe("event", observer);

    observable.notify("event", "String", 1, 32);

    expect(observer).toHaveBeenCalledWith("String", 1, 32);
    expect(observer).toha
  });

  it("should throw for uncallable observer", function () {
    expect(function () {
      observable.observe("event", {});
    }).toThrowError(TypeError);
  });

  it("should notify all, even when some fail", function () {

    var observer1 = jasmine.createSpy("observer1").and.throwError();
    var observer2 = jasmine.createSpy("observer2");

    observable.observe("event", observer1);
    observable.observe("event", observer2);

    observable.notify("event");

    expect(observer1).toHaveBeenCalled();
    expect(observer2).toHaveBeenCalled();
  });

  it("should call observers in the order they were added", function () {
    var calls = [];
    var observer1 = function () {
      calls.push(observer1)
    };
    var observer2 = function () {
      calls.push(observer2)
    };

    observable.observe("event", observer1);
    observable.observe("event", observer2);

    observable.notify("event");

    expect(calls[0]).toEqual(observer1);
    expect(calls[1]).toEqual(observer2);
  });

  it("should not fail if no observers", function () {
    expect(function () {
      observable.notify("event");
    }).not.toThrow();
  });

  it("should notify relevant observers only", function () {
    var observer1 = jasmine.createSpy("observer1");
    var observer2 = jasmine.createSpy("observer2");

    observable.observe("event", observer1);
    observable.observe("other", observer2);

    observable.notify("other");

    expect(observer1).not.toHaveBeenCalled();
    expect(observer2).toHaveBeenCalled();
  });

  it("should not throw error if notify has no event name", function () {
    expect(function () {
      observable.notify();
    }).not.toThrow();
  });

  it("should notify all observers if notify has no event name provided", function () {
    var observer1 = jasmine.createSpy("observer1");
    var observer2 = jasmine.createSpy("observer2");
    var observer3 = jasmine.createSpy("observer3");

    observable.observe("event", observer1);
    observable.observe("other", observer2);
    observable.observe("another", observer3);

    observable.notify();

    expect(observer1).toHaveBeenCalled();
    expect(observer2).toHaveBeenCalled();
    expect(observer3).toHaveBeenCalled();
  });

  it("should throw error if observe has not event name", function () {
    expect(function () {
      observable.observe(function () {});
    }).toThrow();
  });

});