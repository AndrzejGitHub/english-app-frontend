import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {BsModalRef} from "ngx-bootstrap/modal";
import {EventService} from "../../../services/event.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserRole} from "../../../models/user-role.enum";


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})

export class AddUserFormComponent implements OnInit {

  @Input() user?: User;
  @Output() onSubmitClicked: EventEmitter<void> = new EventEmitter<void>();
  roles:UserRole[] = Object.values(UserRole);
  errors: string[] = [];

  form: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    roles: [''],
    password: '',
  }

  constructor(private userService: UserService,
              private bsModalRef: BsModalRef,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.id = this.user.id;
      this.form.firstName = this.user.firstName;
      this.form.lastName = this.user.lastName;
      this.form.roles = this.user.roles;
      this.form.email = this.user.email;
      this.form.password = this.user.password;
    }
  }

  onSubmit(): void {
    this.errors = [];
    if (this.form.roles && this.form.roles.length === 1 && this.form.roles[0] === '') {
      this.form.roles = undefined;
    }
    const userServiceMethod = this.user?.id
      ? this.userService.editUser(this.form)
      : this.userService.addUser(this.form);
    userServiceMethod.subscribe(
      {
        next: (user) => {
          if (this.user?.id) {
            this.eventService.emitUserUpdate(user);
          } else {
            this.eventService.emitUserInsert(user);
          }
          this.resetForm();
          this.bsModalRef.hide();
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.messages) {
            this.errors = errorResponse.error.messages;
          } else {
            this.errors = ['An unexpected error occurred. Please try again.'];
          }
        }
      }
    );
  }

  resetForm(): void {
    this.form = {
      id: undefined,
      firstName: '',
      lastName: '',
      roles: [''],
      email: '',
      password: ''
    };
  }


}
