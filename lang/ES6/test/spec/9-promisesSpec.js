describe('promises', function() {
  describe('basics', function() {
		it('has 3 possible states: pending, fulfilled, rejected');

		it('creation of new promise', function() {
			var promise = new Promise(function (resolve, reject) {
				resolve('success');
			});

			promise.then(function (result) {
				// fulfillment
			}, function (err) {
				// rejection
			});

			expect(true).toBe(true);
		});

		it('can listen only for fulfilment or only for rejection', function () {
			var promise = new Promise(function (resolve, reject) {
				resolve('success');
			});

			promise.then(function (result) {
				// fulfillment
			});

			promise.then(null, function (result) {
				// rejection
			});

			expect(true).toBe(true);
		});

		it('can use catch() which is the same like only rejection handler is used', function() {
			var promise = new Promise(function (resolve, reject) {
				resolve('success');
			});

			promise.catch(function (error) {
				// rejection
			});

			expect(true).toBe(true);
		});

		it('convert async code to promise', function() {

			function readFile(filename) {
				//promise
				return new Promise(function (resolve, reject) {
					// async code
					setTimeout(function () {
						resolve('file read');
					}, 50);
				});
			}

			// not executed until current stack is empty and taken from event loop
			let promise = readFile('/hello.txt');
			promise.then(function (contents) {
				// fulfillment
			}, function (error) {
				// rejection
			});

			expect(true).toBe(true);
		});
  });

	describe('creating settled promises', function() {
		it('already resolved promise ready to then()', function() {
			// always fulfilled with value 42
			let promise = Promise.resolve(42);

			promise.then(function(value) {
				// value === 42
			});

			expect(true).toBe(true);
		});

		it('already rejected promise ready to catch()', function() {
			// always fulfilled with value 42
			let promise = Promise.reject(42);

			promise.catch(function(value) {
				// value === 42
			});

			expect(true).toBe(true);
		});
	});

	describe('creating thenables', function() {
		it('can create object with then method and two args resolve + reject', function() {
			let thenable = {
				then: function (resolve, reject) {
					resolve(42);
				}
			}

			// thenable is then converted to promise and calls then() method on thenable
			let promise = Promise.resolve(thenable);

			promise.then(function (value) {
				// value === 42
			});

			expect(true).toBe(true);
		});
	});

	describe('executor errors', function() {
		it('if error is thrown inside executor, then the rejection handler is called', function() {
			let promise = new Promise(function(resolve, reject) {
				throw new Error('boom !');
			});

			promise.catch(function(error) {
				// error === 'boom !'
			});

			expect(true).toBe(true);
		});

		it('equivalent of previous example', function() {
			let promise = new Promise(function(resolve, reject) {
			    try {
			        throw new Error("boom !");
			    } catch (ex) {
			        reject(ex);
			    }
			});

			promise.catch(function(error) {
				// error === 'boom !'
			});

			expect(true).toBe(true);
		});
	});

	describe('chaining promises', function() {
		it('each call to then() creates another promise which is resolved after previous one was settled', function() {
			let p1 = new Promise(function (resolve, reject) {
				resolve(42);
			});

			p1.then(function(value) {
				// this is called first
				// value === 42
			}).then(function(value) {
				// this is called next after above
			});

			expect(true).toBe(true);
		});

		it('previous example unchained', function() {
			let p1 = new Promise(function(resolve, reject) {
			    resolve(42);
			});

			let p2 = p1.then(function(value) {
				// value === 42
			})

			p2.then(function() {

			});

			expect(true).toBe(true);
		});
	});

	describe('catching errors', function() {
		it('can catch error thrown in previous promise. Keep catch() at the end of the chain.', function() {
			let p1 = new Promise(function(resolve, reject) {
				resolve(42);
			});

			p1.then(function(value) {
				throw new Error('boom !');
			}).catch(function(error) {
				// caught here, error === 'boom !'
			});

			expect(true).toBe(true);
		});
	});

	describe('returning value in promise chains', function() {
		it('should pass from one promise to the next', function() {
			let p1 = new Promise(function(resolve, reject) {
				resolve(42);
			});

			p1.then(function(value) {
				// value === 42
				return value + 1;
			}).then(function(value) {
				// value === 43
			})
		});

		it('the same for rejection', function() {
			let p1 = new Promise(function(resolve, reject) {
				reject(42);
			});

			p1.catch(function(value) {
				// value === 42
				return value + 1;
			}).then(function(value) {
				// value === 43
			});

			expect(true).toBe(true);
		});
	});

	describe('returning promise in promise chains', function() {
		it('promise handler can return instead of primitive another promise', function() {
			let p1 = new Promise(function(resolve, reject) {
				resolve(42);
			});

			let p2 = new Promise(function(resolve, reject) {
				resolve(43);
			});

			p1.then(function(value) {
				// value === 42
				return p2; // invoke p2 first
			}).then(function (value) {
				// then invoke this one
				// value === 43
			});

			expect(true).toBe(true);
		});
	});

	describe('responding to multiple promises', function() {
		describe('Promise.all()', function() {
			it('accepts many promises and resolves only if all of them are resolved', function() {
				let p1 = new Promise(function(resolve, reject) {
				    resolve(42);
				});

				let p2 = new Promise(function(resolve, reject) {
				    resolve(43);
				});

				let p3 = new Promise(function(resolve, reject) {
				    resolve(44);
				});

				let p4 = Promise.all([p1, p2, p3]);

				p4.then(function(value) {
					// value === [42, 43, 44]
				});

				expect(true).toBe(true);
			});

			it('calls catch() if any of the subpromises reject. Does not wait for next promises to execute if previous fails.', function() {
				let p1 = new Promise(function(resolve, reject) {
				    resolve(42);
				});

				let p2 = new Promise(function(resolve, reject) {
				    reject(43);
				});

				let p3 = new Promise(function(resolve, reject) {
				    resolve(44);
				});

				let p4 = Promise.all([p1, p2, p3]);

				p4.catch(function(value) {
					// value === 43
				});

				expect(true).toBe(true);
			});
		});

		describe('Promise.race()', function() {
			it('fulfilled as soon as any of the subpromises is fulfilled', function() {
				let p1 = Promise.resolve(42);

				let p2 = new Promise(function (resolve, reject) {
					resolve(43);
				});

				let p3 = new Promise(function (resolve, reject) {
					resolve(44);
				});

				let p4 = Promise.race([p1, p2, p3]);

				p4.then(function(value) {
					// value === 42
				});

				expect(true).toBe(true);
			});
		});
	});

	describe('inheriting promises', function() {
		it('can create own implementation', function() {
			class MyPromise extends Promise {
			    // use default constructor

			    success(resolve, reject) {
			        return this.then(resolve, reject);
			    }

			    failure(reject) {
			        return this.catch(reject);
			    }

			}

			let promise = new MyPromise(function(resolve, reject) {
			    resolve(42);
			});

			promise.success(function(value) {
			    // value === 42
			}).failure(function(value) {
			    
			});

			expect(true).toBe(true);
		});
	});
});