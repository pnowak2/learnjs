export class UserService {
  user: any;

  setUser(newUser) {
    this.user = newUser;
  }

  getUser() {
    return this.user;
  }
}
