function greet(name) {
  let phrase = `Hello, ${name}`;

  if(name === 'error') {
    throw new Error();
  }

  return say(phrase);
}

function say(phrase) {
  return `** ${phrase} **`;
}

console.log(greet('piotr'));