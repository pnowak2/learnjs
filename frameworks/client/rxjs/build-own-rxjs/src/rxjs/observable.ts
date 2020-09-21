import { Observer } from './observer';
import { Subscription } from './subscription';

type OperatorFunction<A, B> = (source: Observable<A>) => Observable<B>;
export class Observable<T> {
    constructor(private observe: (observer: Observer<T>) => (() => void) | void) { }

    pipe(): Observable<T>;
    pipe<A>(oper1: OperatorFunction<T, A>): Observable<A>;

    pipe(...pipeline: Array<OperatorFunction<any, any>>): Observable<any> {
        let result: Observable<any> = this;

        pipeline.forEach(operator => {
            result = operator(result)
        });

        return result;
    }

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