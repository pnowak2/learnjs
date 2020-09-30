import { Observable } from '../core/observable';
import { OperatorFunction } from "../core/operator-function";
import { Observer } from '../core/observer';

export function map<A, B>(transform: (valueA: A, index: number) => B): OperatorFunction<A, B> {
    let currentIndex = 0;

    return (source: Observable<A>) => {
        return new Observable<B>((observer: Observer<B>) => {
            const subscriptionA = source.subscribe(
                valueA => {
                    const valueB: B = transform(valueA, currentIndex++);
                    observer.next(valueB);
                },
                err => {
                    observer.error(err);
                },
                () => {
                    observer.complete();
                }
            );

            return () => subscriptionA.unsubscribe();
        })
    }
}