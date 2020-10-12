import { Observable, Observer, Subscription } from '../core';
import { OperatorFunction } from '../core/operator-function';

export function concatMap<T, R>(
    project: (value: T, index: number) => Observable<R>
): OperatorFunction<T, R> {
    let currentIndex = 0;
    const buffer: Array<Observable<R>> = [];

    const subscribeTo = (
        projected: Observable<R>,
        obs: Observer<R>,
        subscriptions: Set<Subscription>
    ): void => {
        const sub = projected.subscribe(
            px => obs.next(px),
            err => obs.error(err),
            () => {
                subscriptions.delete(sub);
                if (subscriptions.size === 0 && buffer.length > 0) {
                    subscribeTo(buffer.shift(), obs, subscriptions);
                }
            }
        );
        subscriptions.add(sub);
    };

    return source =>
        new Observable(obs => {
            const subscriptions = new Set<Subscription>();
            const outerSub = source.subscribe(
                x => {
                    const projected = project(x, currentIndex++);
                    if (subscriptions.size > 0) {
                        buffer.push(projected);
                        return;
                    }
                    subscribeTo(projected, obs, subscriptions);
                },
                err => obs.error(err),
                () => {
                    Array.from(subscriptions).forEach(s => s.unsubscribe());
                    obs.complete();
                }
            );
            return () => {
                outerSub.unsubscribe();
                Array.from(subscriptions).forEach(s => s.unsubscribe());
            };
        });
}