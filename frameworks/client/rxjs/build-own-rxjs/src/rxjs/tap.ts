import { Observable, OperatorFunction } from './observable';
import { Observer } from './observer';

export function tap<A>(sideEffect: (value: A) => void): OperatorFunction<A, A> {
    return (sourceA: Observable<A>) => {
        return new Observable<A>((observerB: Observer<A>) => {
            const subscriptionA = sourceA.subscribe(
                value => {
                    sideEffect(value);
                    observerB.next(value);
                },
                err => {
                    observerB.error(err);
                },
                () => {
                    observerB.complete()
                }
            )

            return () => subscriptionA.unsubscribe();
        });
    }
}