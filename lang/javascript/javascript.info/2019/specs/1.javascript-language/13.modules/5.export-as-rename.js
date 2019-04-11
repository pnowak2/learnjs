function sayHi(user) {
  return `hi, ${user}`;
}

function sayBye(user) {
  return `bye, ${user}`;
}

export { sayHi as anotherHi, sayBye as anotherBye };