import { Observer } from './observer';
import { Subscription } from './subscription';

export type OperatorFunction<A, B> = (source: Observable<A>) => Observable<B>;
export class Observable<T> {
    constructor(private observe: (observer: Observer<T>) => (() => void) | void) { }

    pipe(): Observable<T>;
    pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
    pipe<A, B>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>
    ): Observable<B>;
    pipe<A, B, C>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>,
        op3: OperatorFunction<B, C>
    ): Observable<C>;
    pipe<A, B, C, D>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>,
        op3: OperatorFunction<B, C>,
        op4: OperatorFunction<C, D>
    ): Observable<D>;

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