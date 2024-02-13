import {Component, Input, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {User} from "../../../models/user";
import {EventService} from "../../../services/event.service";
import {AddUserFormComponent} from "../add-user-form/add-user-form.component";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent {

  @Input() user: User | undefined;
  @Input() onRemoveUserClick: (userId: number ) => void = () => {};
  @ViewChild(AddUserFormComponent) addUserFormComponent!: AddUserFormComponent;

  constructor(public bsModalRef: BsModalRef) {
  }

  onSubmitClicked(): void {
    if (this.addUserFormComponent) {
      this.addUserFormComponent.onSubmit();
    }
  }

  onCloseClick(): void {
    this.bsModalRef.hide();
  }

  removeUser(userId: number) {
    this.onRemoveUserClick(userId);
    this.bsModalRef.hide();
  }
}

