describe('Iterators', function() {

  describe('classical ES5 iterator implementation', function() {
    it('createIterator with next() method and done + value properties ', function() {
      var createIterator = function(items) {
        var i = 0;

        return {
          next() {
            var done = (i >= items.length),
              value = !done ? items[i++] : undefined;
            return {
              value, done
            }
          }
        }
      }

      var it = createIterator([1, 2, 3]);

      expect(it.next).toEqual(jasmine.any(Function));

      expect(it.next()).toEqual({
        done: false,
        value: 1
      });

      expect(it.next()).toEqual({
        done: false,
        value: 2
      });

      expect(it.next()).toEqual({
        done: false,
        value: 3
      });

      expect(it.next()).toEqual({
        done: true,
        value: undefined
      });

      expect(it.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });
});

describe('generators', function() {
  describe('definition with function *', function() {
    it('creates generator which returns iterator returning 1, 2, 3', function() {
      // the execution stops on each yield returning it's value while next() is called.
      var createIterator = function * () {
          yield 1;
          yield 2;
          yield 3;
        },
        it = createIterator();

      expect(it.next()).toEqual({
        done: false,
        value: 1
      });

      expect(it.next()).toEqual({
        done: false,
        value: 2
      });

      expect(it.next()).toEqual({
        done: false,
        value: 3
      });

      expect(it.next()).toEqual({
        done: true,
        value: undefined
      });
    });

    it('create generator with function * syntax', function() {
      var createIterator = function * (items) {
          for (let i = 0; i < items.length; i++) {
            yield items[i];
          }
        },
        it = createIterator([1, 2, 3]);

      expect(it.next).toEqual(jasmine.any(Function));

      expect(it.next()).toEqual({
        done: false,
        value: 1
      });

      expect(it.next()).toEqual({
        done: false,
        value: 2
      });

      expect(it.next()).toEqual({
        done: false,
        value: 3
      });

      expect(it.next()).toEqual({
        done: true,
        value: undefined
      });

      expect(it.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('Definition as object method', function() {
    it('method notation in object', function() {
      var o = { 
      	* createIterator() {
            yield 1;
            yield 2;
            yield 3;
          }
        },
        it = o.createIterator();

      for (let i of[1, 2, 3]) {
        expect(it.next()).toEqual({
          value: i,
          done: false
        });
      }
    });

    it('method notation in class', function() {
      class Person { 
      	* createIterator() {
          yield 1
        }
      }

      var peter = new Person;

      expect(peter.createIterator().next()).toEqual({
        done: false,
        value: 1
      });
    });
  });
});

describe('itarables and for-of', function() {

	describe('for-of loop', function() {
		it('calls @@iterator method on object first', function() {
			let result = '';
			for(let i of [1, 2, 3]) {
				result +=i;
			}

			expect(result).toBe('123');
		});

		it('throws error if invoked on object without @@iterator', function() {
			expect(function () {
				for(let i of { name: 'test' }) {

				}
			}).toThrow();
		});
	});

	describe('default iterator', function() {
		it('array has built-in default iterator', function() {
			let value = [1, 2, 3],
					iterator = value[Symbol.iterator]();

			expect(iterator.next().value).toBe(1);
			expect(iterator.next().value).toBe(2);
			expect(iterator.next().value).toBe(3);
		});

		it('check if object is iterable', function() {
			let isIterable = function (object) {
				var iterator = object[Symbol.iterator];
				return typeof iterator === 'function';
			}

			expect(isIterable([1, 2, 3])).toBe(true);
			expect(isIterable("abc")).toBe(true);
			expect(isIterable(new Map())).toBe(true);
			expect(isIterable(new Set())).toBe(true);
			expect(isIterable({})).toBe(false);
		});
	});

	describe('creating iterables', function() {
		it('make object iterable', function() {
			let collection = {
						items: [1, 2, 3],
						*[Symbol.iterator]() {
							yield *this.items;
						}
					},
					result = '';

			for (let item of collection) {
				result += item;
			}

			expect(result).toBe('123');
		});

		it('make class iterable', function() {
			class Person {
				constructor() {
					this.employees = ['jo', 'anne', 'cris'];
				}

				*[Symbol.iterator]() {
					yield *this.employees;
				}
			}

			let peter = new Person(),
					employeeString = '';
			for(let employee of peter) {
				employeeString += employee;
			}

			expect(employeeString).toBe('joannecris');
		});
	});

	describe('built-in iterators', function() {
		describe('collection iterators (arrays, maps, sets) expose entries(), values(), keys() iterators', function() {
			it('entries() iterator, each entry object is 2 dimension array', function() {

				let array = ['red', 'blue', 'green'];

				let set = new Set(['a', 'b', 'c']);

				let map = new Map();
				map.set('one', 1);
				map.set('two', 2);
				map.set('three', 3);


				for(let entry of array.entries()) {
					expect(entry).toEqual(jasmine.any(Array));
					expect(entry[0]).toEqual(jasmine.any(Number)); // index 0, 1, 2
					expect(entry[1]).toEqual(jasmine.any(String)); // value 'red', 'blue', 'green'
					expect(entry[1]).toEqual(array[entry[0]]); // verify that above is true
				}

				for(let entry of set.entries()) {
					expect(entry).toEqual(jasmine.any(Array));
					expect(entry[0]).toEqual(jasmine.any(String)); // index 'a', 'b', 'c'
					expect(entry[1]).toEqual(jasmine.any(String)); // value 'a', 'b', 'c'
					expect(entry[1]).toEqual(entry[0]); // verify that above is true
				}

				for(let entry of map.entries() /* same as let entry of map */) {
					expect(entry).toEqual(jasmine.any(Array));
					expect(entry[0]).toEqual(jasmine.any(String)); // index 'one', 'two', 'three'
					expect(entry[1]).toEqual(jasmine.any(Number)); // value 1, 2, 3
					expect(entry[1]).toEqual(map.get(entry[0]));
				}
			});

			it('values() iterator, provides just values', function() {
				let map = new Map();
				map.set('one', 1);
				map.set('two', 2);
				map.set('three', 3);

				for(let val of map.values()) {
					expect(val).toEqual(jasmine.any(Number)); // 1, 2, 3
				}
			});

			it('keys() iterator, provides just keys', function() {
				let map = new Map();
				map.set('one', 1);
				map.set('two', 2);
				map.set('three', 3);

				for(let key of map.keys()) {
					expect(key).toEqual(jasmine.any(String)); // 'one', 'two', 'three'
				}
			});
		});

		describe('string iterators', function() {
			it('should iterate each character', function() {
				let result = '';
				for(let c of "test") {
					result += c + '-'
				}

				expect(result).toBe('t-e-s-t-');
			});
		});
	});

	describe('advanced functionality', function() {
		describe('passing arguments to iterators', function() {
			it('parameter to next() replaces previous yield return value', function() {
				function * createIterator() {
					let first = yield 1;
					let second = yield first + 2
					let third = yield second + 3
				}

				let it = createIterator();

				expect(it.next()).toEqual({
					value: 1,
					done: false
				});

				expect(it.next(4)).toEqual({
					value: 6,
					done: false
				});

				expect(it.next(4)).toEqual({
					value: 7,
					done: false
				});
			});
		});

		describe('throwing error from iterator', function() {
			it('iterator.throw() is like next giving the {value, done}, but generator can catch error and do sth with it', function() {
				let createIterator = function * () {
					let first = yield 1,
							second;

					try {
						second = yield first + 5
					} catch(e) {
						second = 9;
					}

					yield second + 6;
				}

				let it = createIterator();

				expect(it.next()).toEqual({
					value: 1,
					done: false
				});

				expect(it.next(4)).toEqual({
					value: 9,
					done: false
				});

				expect(it.throw(new Error('error'))).toEqual({
					value: 15,
					done: false
				});
			});
		});

		describe('generator return statements', function() {
			it('return indicates that processing is done, done is true, return becomes the value', function() {
				let createIterator = function * () {
					yield 1;
					return 'other';
					yield 2;
					yield 3;
				}

				let it = createIterator();

				expect(it.next()).toEqual({
					value: 1,
					done: false
				});

				expect(it.next()).toEqual({
					value: 'other',
					done: true
				});
			});
		});

		describe('delegating generators', function() {
			it('yield with * (asterisk)', function() {
				let numberGenerator = function * () {
					yield 1;
					yield 2;
				}

				let colorGenerator = function * () {
					yield 'red';
					yield 'green';
				}

				let combinedGenerator = function * () {
					yield *numberGenerator();
					yield *colorGenerator();
					yield true;
				}

				let it = combinedGenerator();

				expect(it.next()).toEqual({
					value: 1,
					done: false
				});

				expect(it.next()).toEqual({
					value: 2,
					done: false
				});

				expect(it.next()).toEqual({
					value: 'red',
					done: false
				});

				expect(it.next()).toEqual({
					value: 'green',
					done: false
				});

				expect(it.next()).toEqual({
					value: true,
					done: false
				});

				expect(it.next()).toEqual({
					value: undefined,
					done: true
				});
			});
		});
	});
});
