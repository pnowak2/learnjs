export const Tuple = function ( /* types */) {
  const typeInfo = Array.prototype.slice.call(arguments, 0);

  const _T = function ( /* values */) {
    const values = Array.prototype.slice.call(arguments, 0);

    if (values.some((val) => val === null || val === undefined)) {
      throw new ReferenceError('Tuples may not have any null values');
    }

    if (values.length !== typeInfo.length) {
      throw new TypeError('Tuple arity does not match its prototype');
    }

    values.map((val, index) => {
      this['_' + (index + 1)] = val;
    });

    Object.freeze(this);
  }

  _T.prototype.values = function () {
    return Object.keys(this).map(function(key) {
      return this[key];
    }, this);
  }

  return _T;
}