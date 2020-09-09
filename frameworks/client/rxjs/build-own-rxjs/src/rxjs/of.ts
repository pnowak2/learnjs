import { Observable } from './observable';

export function of<T>(...values: T[]): Observable<T> {
    return new Observable((observer => {
        values.forEach(v => {
            observer.next(v);
        })
        observer.complete();
    }))
}