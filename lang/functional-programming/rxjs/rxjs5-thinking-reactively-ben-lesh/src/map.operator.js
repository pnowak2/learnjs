export const mapOperator = (observable, mapFn) =>
  (observer) => {
    return observable({
      next(x) { observer.next(mapFn(x)) },
      complete() { observer.complete() },
      error(err) { observer.error(err) }
    });
  };