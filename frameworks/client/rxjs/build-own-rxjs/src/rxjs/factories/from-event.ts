import { Observable } from '../core/observable';

export function fromEvent<T extends Event = Event>(target: EventTarget, eventName: string): Observable<T> {
    return new Observable<T>(observer => {
        const listener: EventListener = (evt: T) => {
            observer.next(evt);
        }

        target.addEventListener(eventName, listener);

        return () => {
           target.removeEventListener(eventName, listener);
        }
    })
}