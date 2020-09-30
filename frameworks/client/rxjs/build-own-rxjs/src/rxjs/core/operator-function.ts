import { Observable } from './observable';

export type OperatorFunction<A, B> = (source: Observable<A>) => Observable<B>;
