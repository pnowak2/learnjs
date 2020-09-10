import { Observable } from './observable';

export function from<T>(convertible: Promise<T> | ArrayLike<T>): Observable<T> {
    if (Array.isArray(convertible)) {
        const array = convertible as T[];

        return new Observable<T>(observer => {
            array.forEach(item => {
                observer.next(item);
            });

            observer.complete();
        });
    }

    const promise = convertible as Promise<T>;

    return new Observable<T>(observer => {
        promise
            .then(value => { 
                observer.next(value) 
                observer.complete();
            })
            .catch(error => observer.error(error))
    });
}