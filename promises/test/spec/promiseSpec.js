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

	describe('Utilities', function() {
		describe('StateUtils', function() {

			var SU = Promz.StateUtils;

			it('should be defined', function() {
				expect(Promz.StateUtils).toEqual(jasmine.any(Object));
			});

			describe('validStates', function() {
				it('should be defined', function() {
					expect(SU.validStates).toEqual({
						PENDING: 0,
						FULFILLED: 1,
						REJECTED: 2
					});
				});
			});

			describe('isValidState', function() {
				it('should have validState', function() {
					expect(SU.isValidState).toEqual(jasmine.any(Function));
				});

				it('should validate only valid states', function() {
					expect(SU.isValidState(SU.validStates.PENDING)).toBe(true);
					expect(SU.isValidState(SU.validStates.FULFILLED)).toBe(true);
					expect(SU.isValidState(SU.validStates.REJECTED)).toBe(true);
				});

				it('should not validate wrong states', function() {
					expect(SU.isValidState('pendin')).toBe(false);
					expect(SU.isValidState('resolved')).toBe(false);
					expect(SU.isValidState('reject')).toBe(false);
				});
			});
		});

		describe('Utils', function() {

			var Utils = Promz.Utils;

			it('should be defined', function() {
				expect(Utils).toEqual(jasmine.any(Object));
			});

			describe('isFunction', function() {
				it('should be defined', function() {
					expect(Utils.isFunction).toEqual(jasmine.any(Function));
				});

				it('should respond with false to non function value', function() {
					expect(Utils.isFunction('test')).toBe(false);
				});

				it('should respond correctly to function value', function() {
					expect(Utils.isFunction(function (){})).toBe(true);
				});
			});

			describe('isObject', function() {
				it('should be defined', function() {
					expect(Utils.isObject).toEqual(jasmine.any(Function));
				});

				it('should respond with false to non object value', function() {
					expect(Utils.isObject('string')).toBe(false);
				});

				it('should respond with true to object value', function() {
					expect(Utils.isObject({})).toBe(true);
				});
			});

			describe('isPromise', function() {
				it('should be defined', function() {
					expect(Utils.isPromise).toEqual(jasmine.any(Function));
				});

				it('should respond with false if value is not promise', function() {
					expect(Utils.isPromise({})).toBe(false);
				});

				it('should respond with true if value is promise', function() {
					expect(Utils.isPromise(new Promz)).toBe(true);
				});
			});

			describe('runAsync', function() {
				it('should be defined', function() {
					expect(Utils.runAsync).toEqual(jasmine.any(Function));
				});

				it('should run function in setTimeout', function() {
					var spy = jasmine.createSpy();
					spyOn(window, 'setTimeout');

					Utils.runAsync(spy)

					expect(window.setTimeout).toHaveBeenCalledWith(spy, 0);
				});
			});
		});		
	});
});