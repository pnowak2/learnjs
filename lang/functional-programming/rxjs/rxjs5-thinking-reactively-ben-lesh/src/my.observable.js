export const myObservable = (observer) => {
  let i = 0;

  const id = setInterval(() => {
    observer.next(i++);
    if (i === 10) {
      observer.complete()
    };
  }, 200);

  return () => clearInterval(id);
}
