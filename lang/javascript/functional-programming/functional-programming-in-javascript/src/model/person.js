export default class Person {
  constructor(firstname, lastname, ssn) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }

  get ssn() {
    return this._ssn;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

  get address() {
    return this._address;
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(year) {
    this._birthYear = year;
  }
  
  set address(addr) {
    this._address = addr;
  }

  peopleInSameCountry(friends) {
    var result = [];
    for (let idx in friends) {
      var friend = friends[idx];
      if (this.address.country === friend.address.country) {
        result.push(friend);
      }
    }
    return result;
  };

  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }
}

