import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {EventService} from "../services/event.service";
import {switchMap} from "rxjs";
import {UserModalComponent} from "./user/user-modal/user-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {UserRole} from "../models/user-role.enum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] | undefined
  loggedUser: User | null = null;

  constructor(public userService: UserService,
              private eventService: EventService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(user => {
      this.loggedUser = user;
      if ((user) && (user.roles?.includes(UserRole.ROLE_ADMIN))) {
        this.getUsers();
        this.subscribeToUserRemovalEvent();
        this.subscribeToUserUpdateEvent();
        this.subscribeToUserInsertEvent();
      }
    });
  }

  private subscribeToUserInsertEvent(): void {
    this.eventService.userInsert$.subscribe({
        next: (user) => {
          this.userService.addUser(user);
          this.getUsers();
        }
      }
    );
  }

  private subscribeToUserUpdateEvent(): void {
    this.eventService.userUpdate$.subscribe(
      (user) => {
        this.userService.editUser(user);
        this.getUsers();
      }
    )
  }

  private subscribeToUserRemovalEvent(): void {
    this.eventService.userRemoval$
      .pipe(switchMap((userId) =>
        userId ? this.userService.delUser(userId) : "null")
      )
      .subscribe(
        {
          next: () => this.getUsers(),
          error: (error) => {
            console.error("Unable to load data from the database. Please try again later. ", error)
          }
        }
      );
  }

  getUsers() {
    this.userService.getUsers().subscribe({
        next: (users) => {
          this.users = users
        },
      }
    )
  }

  addUser() {
    const initialState = {}
    this.modalService.show(UserModalComponent, {initialState});
  }
}
