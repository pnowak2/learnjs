import { Observable, OperatorFunction } from '../core/observable';
import { Observer } from '../core/observer';
import { Subscription } from '../core/subscription';

// Not finished
export function catchError<A, B>(selector: (err: any, caught: Observable<A>) => Observable<B>): OperatorFunction<A, A | B> {
    return source => {
        return new Observable<A>((observerB: Observer<A | B>) => {
            let altSubscription: Subscription;
            const subscription = source.subscribe(
                value => {
                    try {
                        observerB.next(value);
                    } catch (err) {
                        const alternativeObservable = selector(err, source);

                        altSubscription = alternativeObservable.subscribe(
                            altValue => {
                                observerB.next(altValue);
                            },
                            altErr => {
                                observerB.error(altErr);
                            },
                            () => {
                                observerB.complete();
                            }
                        );
                    }
                },
                err => {
                    observerB.error(err);
                },
                () => {
                    observerB.complete()
                }
            )

            return () =>  { 
                subscription.unsubscribe() ;

                if(altSubscription) {
                    altSubscription.unsubscribe();
                }
            };
        });
    }
}