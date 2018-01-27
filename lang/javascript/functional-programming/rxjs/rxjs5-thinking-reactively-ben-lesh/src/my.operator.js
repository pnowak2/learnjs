export const operator = observable =>
  (observer) => {
    return observable({
      next(x) { observer.next(x) },
      complete() { observer.complete() },
      error(err) { observer.error(err) }
    });
  };