describe('Promise', function() {

	describe('Constructor function', function() {
	  it('should be defined', function() {
	    expect(MyPromise).toEqual(jasmine.any(Function));
	  });

	  it('should have create static method', function() {
	    expect(MyPromise.create).toEqual(jasmine.any(Function));
	  });
	});

	describe('Create method', function() {
		it('should return function', function() {
			expect(MyPromise.create()).toEqual(jasmine.any(Function));
		});
	});
	
});

describe('Promise Use', function() {
	it('should use then', function() {
		var asyncApi = function () {},
				asyncApiPromise = MyPromise.create(asyncApi),
				spy1 = jasmine.createSpy(),
				spy2 = jasmine.createSpy();

		asyncApiPromise('myParam')
		.then(spy1)
		.then(spy2);

		expect(spy1).toHaveBeenCalled();
		expect(spy2).toHaveBeenCalled();
	});
});
