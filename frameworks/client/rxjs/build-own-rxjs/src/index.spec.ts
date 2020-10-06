import { from, fromEvent, Observable, of, Subscription } from './rxjs';
import { catchError, filter, map, reduce, tap, mergeMap } from './rxjs/operators';

describe('Core', () => {
    it('should create simple observable', (done) => {
        const teardownMock = jest.fn();

        const obs = new Observable<number>((observer) => {
            observer.next(5);
            observer.complete();

            return teardownMock;
        });

        const sub: Subscription = obs.subscribe(value => {
            expect(value).toBe(5);
            done();
        });

        sub.unsubscribe();

        expect(teardownMock).toHaveBeenCalled();
    });
});

describe('Factories', () => {
    describe('of()', () => {
        it('should create observable from series of values', (done) => {
            const obs = of<number>(2, 3, 4);
            const fn = jest.fn();

            obs.subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);

                expect(fn.mock.calls[0][0]).toBe(2);
                expect(fn.mock.calls[1][0]).toBe(3);
                expect(fn.mock.calls[2][0]).toBe(4);

                done();
            })
        });
    });

    describe('from()', () => {
        it('should build Observable from array of values', (done) => {
            const obs = from<number>([4, 5, 6]);
            const fn = jest.fn();

            obs.subscribe(fn, null, () => {
                expect(fn.mock.calls[0][0]).toBe(4);
                expect(fn.mock.calls[1][0]).toBe(5);
                expect(fn.mock.calls[2][0]).toBe(6);

                done();
            })
        });

        it('from Promise', (done) => {
            const obs = from<number>(new Promise(resolve => {
                setTimeout(() => {
                    resolve(24);
                }, 50);
            }));

            const fn = jest.fn();

            obs.subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledWith(24);
                done();
            })
        });
    });

    describe('fromEvent()', () => {
        it('should build Observable from event listener', (done) => {
            const el: HTMLElement = document.createElement('div');
            const obs = fromEvent<MouseEvent>(el, 'click');

            obs.subscribe(evt => {
                expect(evt.type).toEqual('click');
                done();
            });

            el.dispatchEvent(new MouseEvent('click'));
        });
    });
});

describe('Operators', () => {
    describe('map()', () => {
        it('should map each value with index', (done) => {
            const obs = of<number>(2, 3, 4);
            const fn = jest.fn();

            obs.pipe(
                map((value, index) => value * value * index)
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);
                expect(fn.mock.calls[0][0]).toBe(0);
                expect(fn.mock.calls[1][0]).toBe(9);
                expect(fn.mock.calls[2][0]).toBe(32);

                done();
            })
        });
    });

    describe('reduce()', () => {
        it('should reduce to one value and emit', (done) => {
            const obs = of<number>(2, 3, 4);
            const fn = jest.fn();

            obs.pipe(
                reduce((acc, val, index) => {
                    return acc + val + index;
                }, 0)
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(1);
                expect(fn.mock.calls[0][0]).toBe(12);

                done();
            })
        });
    });



    describe('filter()', () => {
        it('should filter only qualified values', (done) => {
            const obs = of<number>(2, 3, 4, 5, 6);
            const fn = jest.fn();

            obs.pipe(
                filter(val => val % 2 === 0),
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);
                expect(fn.mock.calls[0][0]).toBe(2);
                expect(fn.mock.calls[1][0]).toBe(4);
                expect(fn.mock.calls[2][0]).toBe(6);

                done();
            })
        });
    });



    describe('tap()', () => {
        it('should call side effect code', (done) => {
            const obs = of<number>(2, 3, 4);
            const fn = jest.fn();
            const tapFn = jest.fn();

            obs.pipe(
                tap(tapFn),
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);
                expect(fn.mock.calls[0][0]).toBe(2);
                expect(fn.mock.calls[1][0]).toBe(3);
                expect(fn.mock.calls[2][0]).toBe(4);

                expect(tapFn).toHaveBeenCalledTimes(3);
                expect(tapFn.mock.calls[0][0]).toBe(2);
                expect(tapFn.mock.calls[1][0]).toBe(3);
                expect(tapFn.mock.calls[2][0]).toBe(4);
                done();
            })
        });
    });

    xdescribe('catchError()', () => {
        it('should filter only qualified values', (done) => {
            const obs = of<number>(2, 3, 4);
            const fn = jest.fn();

            obs.pipe(
                map(n => {
                    if (n === 4) {
                        throw new Error('four!');
                    }
                    return n;
                }),
                catchError(err => of(5, 6, 7)),
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);
                // expect(fn.mock.calls[0][0]).toBe(2);
                // expect(fn.mock.calls[1][0]).toBe(4);
                // expect(fn.mock.calls[2][0]).toBe(6);

                done();
            })
        });
    });

    describe('mergeMap()', () => {
        it('should ..', (done) => {
            const outer = of<number>(2, 3, 4);
            const createInner = (input: number): Observable<string> => {
                return new Observable(obs => {
                    obs.next('http://' + input)
                    obs.complete();
                });
            };
            const fn = jest.fn();

            outer.pipe(
                mergeMap(value => createInner(value))
            ).subscribe(fn, null, () => {
                expect(fn).toHaveBeenCalledTimes(3);
                expect(fn.mock.calls[0][0]).toBe('http://2');
                expect(fn.mock.calls[1][0]).toBe('http://3');
                expect(fn.mock.calls[2][0]).toBe('http://4');
                done();
            })
        });
    });
});