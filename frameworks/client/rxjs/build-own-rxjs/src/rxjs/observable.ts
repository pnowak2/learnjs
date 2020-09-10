import { Observer } from './observer';
import { Subscription } from './subscription';

export class Observable<T> {
    constructor(private observe: (observer: Observer<T>) => (() => void) | void) { }

    subscribe(
        next?: (value: T) => void,
        error?: (error: any) => void,
        complete?: () => void,
    ): Subscription {
        const observer: Observer<T> = {
            next(value: T): void {
                if (next) { next(value); }
            },
            error(err: any): void {
                if (error) { error(err); }
            },
            complete(): void {
                if (complete) { complete(); }
            }
        }

        const teardown = this.observe(observer);

        return {
            unsubscribe() {
                if (teardown) { teardown() }
            }
        };
    }
}