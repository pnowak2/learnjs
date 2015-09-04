describe("create real ajax object", function() {
  it("should return XMLHttpRequest object", function() {

    var xhr = tddjs.ajax.create();

    expect(xhr.readyState).toEqual(jasmine.any(Number));
    expect(tddjs.isHostMethod(xhr, "open")).toBeTruthy();
    expect(tddjs.isHostMethod(xhr, "send")).toBeTruthy();
    expect(tddjs.isHostMethod(xhr, "setRequestHeader")).toBeTruthy();
  });
});

describe("ajax internals", function() {

  var ajax,
    fakeXMLHttpRequest,
    forceStatusAndReadyState;

  beforeEach(function() {
    ajax = tddjs.ajax;
    fakeXMLHttpRequest = {
      open: jasmine.createSpy("open"),
      send: jasmine.createSpy("send"),
      readyState: function(readyState) {
        this.readyState = readyState;
        this.onreadystatechange();
      }
    };
    spyOn(ajax, "create").and.returnValue(fakeXMLHttpRequest);
  });

  forceStatusAndReadyState = function(xhr, status, rs) {
    var success = jasmine.createSpy("success");
    var failure = jasmine.createSpy("failure");

    ajax.get("/url", {
      success: success,
      failure: failure
    });

    xhr.status = status;
    xhr.readyStateChange(rs);

    return {
      success: null
    }

  }

  it("should create ajax namespace", function() {
    expect(ajax).toEqual(jasmine.any(Object));
  });

  it("should have create function", function() {
    expect(ajax.create).toEqual(jasmine.any(Function));
  });

  it("should define get method", function() {
    expect(ajax.get).toEqual(jasmine.any(Function));
  });

  it("should should throw error without url", function() {
    expect(function() {
      ajax.get();
    }).toThrowError(TypeError);
  });

  it("should obtain an XMLHttpRequest object", function() {
    ajax.get("/url");
    expect(ajax.create).toHaveBeenCalled();
  });

  it("should call open with method, url, async flag", function() {
    ajax.get("/url");
    expect(fakeXMLHttpRequest.open).toHaveBeenCalledWith("GET", "/url", true);
  });

  it("should add onreadystatechange handler", function() {
    ajax.get("/url");
    expect(fakeXMLHttpRequest.onreadystatechange).toEqual(jasmine.any(Function));
  });

  it("should call send", function() {
    ajax.get("/url");
    expect(fakeXMLHttpRequest.send).toHaveBeenCalled();
  });

  it("should call success handler for status 200", function() {
    fakeXMLHttpRequest.readyState = 4;
    fakeXMLHttpRequest.status = 200;
    var success = jasmine.createSpy("success");

    ajax.get("/url", {
      success: success
    });
    fakeXMLHttpRequest.onreadystatechange();

    expect(success).toHaveBeenCalled();
  });

  it("should not throw error without success handler", function() {
    fakeXMLHttpRequest.readyState = 4;
    fakeXMLHttpRequest.status = 200;

    ajax.get("/url");

    expect(function() {
      fakeXMLHttpRequest.onreadystatechange();
    }).not.toThrowError();

  });

  it("should pass null as argument to send", function() {
    ajax.get("/url");
    expect(fakeXMLHttpRequest.send).toHaveBeenCalledWith(null);
  });

});