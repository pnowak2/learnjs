describe('Promz', function() {
	describe('creation', function() {
		it('should exist', function() {
			expect(Promz).toEqual(jasmine.any(Function));
		});
	});

	describe('state property', function() {

		var promz;

		beforeEach(function () {
			promz = new Promz;
		});

		it('should be defined', function() {
			expect(promz.state).toBeDefined();
		});

		it('should have default state of PENDING', function() {
			expect(promz.state).toBe(Promz.StateUtils.validStates.PENDING);
		});
	});

	describe('value property', function() {

		var promz;

		beforeEach(function () {
			promz = new Promz;
		});

		it('should be defined', function() {
			expect(promz.value).toBeDefined();
		});

		it('should be null', function() {
			expect(promz.value).toBe(null);
		});
	});

	describe('queue property', function() {

		var promz;

		beforeEach(function () {
			promz = new Promz;
		});

		it('should be defined', function() {
			expect(promz.queue).toBeDefined();
		});

		it('should be empty array', function() {
			expect(promz.queue).toEqual([]);
		});
	});

	describe('handlers property', function() {
		var promz;

		beforeEach(function () {
			promz = new Promz;
		});

		it('should be defined', function() {
			expect(promz.handlers).toEqual(jasmine.any(Object));
		});

		it('should have fulfill handler', function() {
			expect(promz.handlers.fulfill).toBe(null);
		});

		it('should have reject handler', function() {
			expect(promz.handlers.reject).toBe(null);
		});
	});

	describe('transition', function() {

		var promz ;

		beforeEach(function () {
			promz = new Promz;
		});

		it('should be defined', function() {
			expect(promz.transition).toEqual(jasmine.any(Function));
		});

		describe('state', function() {
			it('should change to FULFILLED while in PENDING', function() {
				promz.transition(Promz.StateUtils.validStates.FULFILLED);
				expect(promz.state).toEqual(Promz.StateUtils.validStates.FULFILLED);
			});

			it('should change to REJECTED while in PENDING', function() {
				promz.transition(Promz.StateUtils.validStates.REJECTED);
				expect(promz.state).toEqual(Promz.StateUtils.validStates.REJECTED);
			});

			it('should not change from state other than PENDING', function() {
				promz.state = Promz.StateUtils.validStates.REJECTED;
				promz.transition(Promz.StateUtils.validStates.FULFILLED);

				expect(promz.state).toEqual(Promz.StateUtils.validStates.REJECTED);

				promz.state = Promz.StateUtils.validStates.FULFILLED;
				promz.transition(Promz.StateUtils.validStates.REJECTED);

				expect(promz.state).toEqual(Promz.StateUtils.validStates.FULFILLED);

				promz.state = Promz.StateUtils.validStates.FULFILLED;
				promz.transition(Promz.StateUtils.validStates.PENDING);

				expect(promz.state).toEqual(Promz.StateUtils.validStates.FULFILLED);
			});

			it('should not change if given state is invalid', function() {
				promz.transition('other');
				expect(promz.state).toEqual(Promz.StateUtils.validStates.PENDING);
			});
		});

		describe('value', function() {
			it('should set value when in PENDING state and changing to other valid state', function() {
				promz.transition(Promz.StateUtils.validStates.FULFILLED, 'my value');
				expect(promz.value).toEqual('my value');
			});

			it('should not set value with inivalid state', function() {
				promz.transition(Promz.StateUtils.validStates.PENDING, 'my value');
				expect(promz.value).toEqual(null);

				promz.state = Promz.StateUtils.validStates.FULFILLED
				promz.transition(Promz.StateUtils.validStates.REJECTED, 'my value');
				expect(promz.value).toEqual(null);
			});
		});

		describe('process', function() {
			it('should call process when in PENDING state and changing to other valid state', function() {
				spyOn(promz, 'process');
				promz.transition(Promz.StateUtils.validStates.FULFILLED, 'my value');
				expect(promz.process).toHaveBeenCalled();
			});

			it('should not call process if transition with invalid state', function() {
				spyOn(promz, 'process');
				promz.state = Promz.StateUtils.validStates.FULFILLED
				promz.transition(Promz.StateUtils.validStates.REJECTED, 'my value');
				expect(promz.process).not.toHaveBeenCalled();
			});

			it('should not call process if arguments are more than 2', function() {
				spyOn(promz, 'process');
				promz.transition(Promz.StateUtils.validStates.FULFILLED, 'my value', 'another', 'one');
				expect(promz.process).not.toHaveBeenCalled();
			});
		});
	});

	describe('then', function() {

		it('should be defined', function() {
			expect(new Promz().then).toEqual(jasmine.any(Function));
		});

		describe('queuedPromz instance', function() {
			it('should be created', function() {
				expect(new Promz().then()).toEqual(jasmine.any(Promz));
			});
		});

		describe('passed handlers', function() {

			describe('nothing provided', function() {
				it('should be possible to omit handlers', function() {
					var promz = new Promz;
					promz.then();
					expect(promz.handlers.fulfill).toBe(null);
					expect(promz.handlers.reject).toBe(null);
				});
			});

			describe('fulfill and reject provided as functions', function() {
				it('should save them in handlers object', function() {
					var fulfillSpy = jasmine.createSpy(),
							rejectSpy = jasmine.createSpy(),
							promz = new Promz;

					promz.then(fulfillSpy, rejectSpy);

					expect(promz.handlers.fulfill).toBe(fulfillSpy);
					expect(promz.handlers.reject).toBe(rejectSpy);
				});
			});
		});

		describe('process', function() {
			it('should be called without handlers', function() {
				spyOn(Promz.prototype, 'process');
				expect(Promz.prototype.process).not.toHaveBeenCalled();
				var promz = new Promz().then();
				expect(Promz.prototype.process).toHaveBeenCalled();
			});

			it('should be called with handlers', function() {
				spyOn(Promz.prototype, 'process');
				expect(Promz.prototype.process).not.toHaveBeenCalled();
				var promz = new Promz().then(function(){}, function () {});
				expect(Promz.prototype.process).toHaveBeenCalled();
			});
		});
	});
});