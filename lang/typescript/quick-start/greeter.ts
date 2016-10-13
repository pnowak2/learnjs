class Student implements Person {
  fullName: string;

  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial}, ${lastName.toUpperCase}`;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return `Hello ${person.firstName} ${person.lastName}`;
} 

let user = {
  firstName: 'Piotr',
  lastName: 'Nowak'
}

var user2 = new Student('Piotr', 'Andrzej', 'Nowak');

document.body.innerHTML = greeter(user2);