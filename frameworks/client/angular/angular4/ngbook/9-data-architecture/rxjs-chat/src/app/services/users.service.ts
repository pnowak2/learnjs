import { User } from './../models/user.model';
import { Subject, BehaviorSubject } from 'rxjs';

export class UsersService {
  currentUser$: Subject<User> = new BehaviorSubject<User>(null);

  setCurrentUser(newUser: User) {
    this.currentUser$.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UsersService
];

