function chapter1() {
  let arr = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

  let source = Rx.Observable
    .interval(400)
    .take(9)
    .map(i => arr[i])
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y);

  source.subscribe(x => console.log(x))
}

chapter1();