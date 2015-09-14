describe('Promz', function() {

	describe('create', function() {
		it('should be defined', function() {
			expect(Promz.create).toEqual(jasmine.any(Function), 'create method not found');
		});

		it('should return Promz object', function() {
			var promz = Promz.create();
			expect(promz).toEqual(jasmine.any(Promz));
		});

		it('should accept a function', function() {
			var spy = jasmine.createSpy(),
					promz = Promz.create(spy);

			expect(promz.func).toBe(spy);
		});
	});

	describe('Promz instance', function() {
		var promz;

		beforeEach(function() {
			promz = new Promz
		});

		it('should have then method', function() {
			expect(promz.then).toEqual(jasmine.any(Function));
		});

		it('should return Promz object', function() {
			expect(promz.then()).toEqual(jasmine.any(Promz));
		});
	});

	describe('Promz then', function() {
		var promz, originalFunc;

		beforeEach(function() {
			originalFunc = jasmine.createSpy();
			promz = new Promz(originalFunc);
		});

		it('should invoke original function', function() {
			expect(originalFunc).toHaveBeenCalled();
		});

		it('should invoke original function even if this.func is not defined', function() {
			promz = new Promz;

			expect(function () {
				promz.then();
			}).not.toThrow();
		});

		it('should invoke function passed to then', function() {
			var thenFunc = jasmine.createSpy('thenFun');
			promz.then(thenFunc);
			expect(thenFunc).toHaveBeenCalled();
		});

		it('should invoke first original func and then "then func"', function() {
			var result = '';
					originalFunc = function () { result += 'o'},
					thenFunc = function () { result += 't' };

			Promz.create(originalFunc)
			.then(thenFunc);

			expect(result).toEqual('ot');

		});

		it('should invoke full chain of thens', function() {
			var thenFunc1 = jasmine.createSpy('then1'),
					thenFunc2 = jasmine.createSpy('then2'),
					thenFunc3 = jasmine.createSpy('then3');

			promz
			.then(thenFunc1)
			.then(thenFunc2)
			.then(thenFunc3);

			expect(originalFunc).toHaveBeenCalled();
			expect(thenFunc1).toHaveBeenCalled();
			expect(thenFunc2).toHaveBeenCalled();
			expect(thenFunc3).toHaveBeenCalled();

			expect(originalFunc.calls.count()).toBe(1);
			expect(thenFunc1.calls.count()).toBe(1);
			expect(thenFunc2.calls.count()).toBe(1);
			expect(thenFunc3.calls.count()).toBe(1);
		});
	});
});