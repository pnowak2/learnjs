type Fn = () => void;

export interface Scheduler {
    schedule(work: Fn): void;
}

export const syncScheduler: Scheduler = {
    schedule(work: Fn): void {
        work();
    }
}

export const asyncScheduler: Scheduler = {
    schedule(work: Fn): void {
        setTimeout(() => {
            work();
        });
    }
}