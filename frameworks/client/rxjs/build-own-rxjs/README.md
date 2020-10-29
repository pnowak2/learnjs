RxJs: Build your own observable

4 parts series by travis kaufman
https://medium.com/@traviskaufman/demystifying-rxjs-by-building-it-ourselves-1bc1fc11606

4 parts series by nate lapinski
https://indepth.dev/build-your-own-observable-part-1-arrays/

Ben lesh talk, creator on doing own observable
https://www.youtube.com/watch?v=m40cF91F8_A&

Docs
https://rxjs.dev/

Hot vs Cold Observables
https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339

The magic of RXJS sharing operators and their differences
https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255

```javascript
function makeHot(cold) {
  const subject = new Subject();
  cold.subscribe(subject);
  return new Observable((observer) => subject.subscribe(observer));
}
```

```javascript
function makeHotRefCounted(cold) {
  const subject = new Subject();
  const mainSub = cold.subscribe(subject);
  let refs = 0;
  return new Observable((observer) => {
    refs++;
    let sub = subject.subscribe(observer);
    return () => {
      refs--;
      if (refs === 0) mainSub.unsubscribe();
      sub.unsubscribe();
    };
  });
}
```