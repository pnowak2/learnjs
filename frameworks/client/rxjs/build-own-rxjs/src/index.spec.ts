import { Observable, of, Subscription } from './rxjs/index';

describe('', () => {
    it('should build observable simple interface', (done) => {
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
    });

    it('should build of() observer factory', (done) => {
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
