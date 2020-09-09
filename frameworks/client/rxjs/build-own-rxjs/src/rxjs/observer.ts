export interface Observer<T> {
    next(value: T): void;
    error(error: any): void;
    complete(): void;
}