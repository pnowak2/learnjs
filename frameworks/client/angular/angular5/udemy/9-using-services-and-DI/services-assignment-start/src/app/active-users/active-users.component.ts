import { UsersService } from './../users.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private usersService: UsersService) { }

  onSetToInactive(id: number) {
    this.usersService.setUserInactive(id);
  }

  ngOnInit() {
    this.users = this.usersService.inactiveUsers;
  }
}
