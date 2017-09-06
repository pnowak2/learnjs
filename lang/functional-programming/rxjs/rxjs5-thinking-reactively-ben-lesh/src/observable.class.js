export class Observable {
  constructor(observable) {
    this.observable = observable;
  }

  subscribe(observer) {
    return this.observable(observer)
  }

  map(mapFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next(val) { observer.next(mapFn(val)) },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      })
    })
  }

  flatMap(mapFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next(val) {
          const obs = mapFn(val);
          obs.subscribe({
            next(v) { observer.next(v) },
            complete() { observer.complete() }
          })

        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      })
    })
  }

  takeUntil(o$) {
    let shouldStop = false;

    return new Observable((observer) => {
      o$.subscribe({
        next() { shouldStop = true },
        complete() { shoultStop = true }
      });

      return this.subscribe({
        next(v) { 
          if(!shouldStop) {
            observer.next(v) 
          } else {
            observer.complete();
          }
        },
        complete() { observer.complete() }
      })
    })
  }

  count() {
    return new Observable((observer) => {
      let i = 0;
      return this.subscribe({
        next(val) {
          i = i + 1;
          observer.next(i)
        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      })
    })
  }

  distinct() {

    return new Observable((observer) => {
      let last;

      return this.subscribe({
        next(val) {
          if (last !== val) {
            observer.next(val);
          }
          last = val;
        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      })
    })
  }

  take(n) {
    let i = 0;

    return new Observable((observer) => {
      return this.subscribe({
        next(val) {
          if (i <= n - 1) {
            observer.next(val);
            i = i + 1;
          } else {
            observer.complete();
          }
        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      })
    })
  }

  static interval(time) {
    return new Observable((observer) => {
      let i = 1;
      const id = setInterval(() => {
        observer.next(i++);

        if (i === 10) {
          observer.complete();
        }
      }, 50);

      return () => clearInterval(id);
    });
  }

  static fromArray(arr) {
    return new Observable((observer) => {
      arr.forEach((item) => {
        observer.next(item);
      });

      observer.complete();

      return () => { };
    });
  }

  static fromEvent(el, eventName) {
    return new Observable((observer) => {
      el.addEventListener(eventName, () => {
        observer.next(el);
      });
    });
  }

  static ajax(url, params) {
    return new Observable((observer) => {
      fetch(url)
        .then((resp) => {
          return resp.json()
        })
        .then(function (data) {
          observer.next(data);
          observer.complete();
        })
        .catch(function (err) {
          observer.error(err);
        });
    })
  }
}
