import { Observable, OperatorFunction } from './observable';
import { Observer } from './observer';

export function filter<A>(fltr: (value: A) => boolean): OperatorFunction<A, A> {
    return source => {
        return new Observable<A>((observerB: Observer<A>) => {
            const subscription = source.subscribe(
                value => {
                    const isIncluded = fltr(value);
                    if (isIncluded) {
                        observerB.next(value);
                    }
                },
                err => {
                    observerB.error(err);
                },
                () => {
                    observerB.complete()
                }
            )

            return () => subscription.unsubscribe();
        });
    }
}