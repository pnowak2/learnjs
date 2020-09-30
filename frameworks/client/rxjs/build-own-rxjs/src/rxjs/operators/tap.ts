import { Observable } from '../core/observable';
import { OperatorFunction } from "../core/operator-function";
import { Observer } from '../core/observer';

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