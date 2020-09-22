import { Observable, OperatorFunction } from './observable';
import { Observer } from './observer';

export function reduce<A, B>(
    accumulate: (acc: A | B, value: A, index: number) => A | B,
    seed?: A | B
): OperatorFunction<A, A | B> {
    let currentIndex = 0;
    let accumulated = seed;

    return (source: Observable<A>) => {
        return new Observable<A | B>((observer: Observer<A | B>) => {
            const subscription = source.subscribe(
                (value: A) => {
                    accumulated = accumulate(accumulated, value, currentIndex++)
                },
                err => {
                    observer.error(err);
                },
                () => {
                    observer.next(accumulated);
                    observer.complete();
                }
            );

            return () => subscription.unsubscribe();
        })
    }
}