import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum RxJsLogginLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLogginLevel = RxJsLogginLevel.INFO;

export function setRxJsLogginLevel(level: RxJsLogginLevel) {
    rxjsLogginLevel = level;
}

export const debug = (level: number, message: string) =>
    (source$: Observable<any>): Observable<any> => source$.pipe(
        tap(val => {
            if (level >= rxjsLogginLevel) {
                console.log(`[${level}] ${message}: ${val}`);
            }
        })
    );
