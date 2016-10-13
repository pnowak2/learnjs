var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + ", " + lastName.toUpperCase;
    }
    return Student;
}());
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: 'Piotr',
    lastName: 'Nowak'
};
var user2 = new Student('Piotr', 'Andrzej', 'Nowak');
document.body.innerHTML = greeter(user2);
