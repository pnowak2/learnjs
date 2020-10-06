import { OperatorFunction } from "../core/operator-function";
import { Observable, Observer, Subscription } from '../core';

export function mergeMap<A, B>(
    project: (val: A, index: number) => Observable<B>
): OperatorFunction<A, B> {
    let currentIndex = 0;

    return (source: Observable<A>) => {
        return new Observable<B>((obs) => {
            const subs = new Set<Subscription>();
            const sub = source.subscribe(
                x => {
                    const projected = project(x, currentIndex++);
                    const innerSub = projected.subscribe(
                        px => obs.next(px),
                        err => obs.error(err),
                        () => subs.delete(innerSub)
                    );
                    subs.add(innerSub);
                },
                err => obs.error(err),
                () => {
                    Array.from(subs).forEach(s => s.unsubscribe());
                    obs.complete();
                }
            )

            subs.add(sub);
            return () => Array.from(subs).forEach(s => s.unsubscribe());
        });
    }
}