export class MonadWrapper {
    constructor(value) {
        this._value = value
    }

    static of(a) {
        return new MonadWrapper(a);
    }

    map(fn) {
        return MonadWrapper.of(fn(this._value));
    }

    join() {
        if (!(this._value instanceof MonadWrapper)) {
            return this;
        }

        return this._value.join();
    }

    toString() {
        return `MWrapper (${this._value})`;
    }
}
export const monadwrap = (val) => new MonadWrapper(val);