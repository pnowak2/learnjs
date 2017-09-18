const debouncedEl = document.querySelector('#debouncedInput');
const throttledEl = document.querySelector('#throttledInput');

const notEmpty = input => !!input && input.trim().length > 0;

const debounced$ = Rx.Observable
  .fromEvent(debouncedEl, 'keyup')
  .debounceTime(500)
  .pluck('target', 'value')
  .filter(notEmpty)
  .map(input => input.trim())

debounced$.subscribe(val => {
  console.log(`Sending request with ${val}`);
});

const throttled$ = Rx.Observable
  .fromEvent(throttledEl, 'keyup')
  .throttleTime(1000)
  .pluck('target', 'value')
  .filter(notEmpty)
  .map(input => input.trim())

throttled$.subscribe(val => {
  console.log(`Sending request with ${val}`);
});