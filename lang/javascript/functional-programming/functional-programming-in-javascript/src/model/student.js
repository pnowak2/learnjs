import Person from './person';

export default class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn);
    this._school = school;
  }
  
  get school() {
    return this._school;
  }

  studentsInSameCountryAndSchool(friends) {
    var closeFriends = super.peopleInSameCountry(friends);
    var result = [];
    for (let idx in closeFriends) {
      var friend = closeFriends[idx];
      if (friend.school === this.school) {
        result.push(friend);
      }
    }
    return result;
  };
}