export class Wrapper {
    constructor(value) {
        this._value = value
    }

    map(fn) {
        return fn(this._value)
    }

    fmap(fn) {
        return wrap(fn(this._value));
    }

    toString() {
        return `Wrapper (${this._value})`;
    }
}

export const wrap = (val) => new Wrapper(val);