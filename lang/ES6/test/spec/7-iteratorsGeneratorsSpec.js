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
	it('defines default iterator to be iterable', function() {
		
	});

	it('for-of loop works with iterables', function() {
		
	});
});
