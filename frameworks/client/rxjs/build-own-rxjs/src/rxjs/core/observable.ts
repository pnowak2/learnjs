import { Observer } from './observer';
import { OperatorFunction } from './operator-function';
import { Scheduler, syncScheduler } from './scheduler';
import { Subscription } from './subscription';

export class Observable<T> {
    constructor(
        private observe: (observer: Observer<T>) => (() => void) | void,
        private scheduler: Scheduler = syncScheduler
    ) { }

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
        const that = this;

        const observer: Observer<T> = {
            next(value: T): void {
                if (next) { that.scheduler.schedule(() => next(value)) }
            },
            error(err: any): void {
                if (error) { that.scheduler.schedule(() => error(err)) }
            },
            complete(): void {
                if (complete) { that.scheduler.schedule(() => complete()) }
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