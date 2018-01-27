export let myobservable = (events) => {
  const INTERVAL = 1 * 10;
  let schedulerId;

  return {
    subscribe: (observer) => {
      schedulerId = setInterval(() => {
        if (events.length === 0) {
          clearInterval(schedulerId);
          observer.complete();
          schedulerId = undefined;
        } else {
          observer.next(events.shift());
        }
      }, INTERVAL);

      return {
        unsubscribe: () => {
          if (schedulerId) {
            clearInterval(schedulerId);
          }
        }
      }
    }
  }
}

export const myobserver = {
  next: function () {

  },
  error: function () {

  },
  complete: function () {

  }
}