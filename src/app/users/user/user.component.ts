import {Component, Input} from '@angular/core';
import {User} from "../../models/user";
import {BsModalService} from 'ngx-bootstrap/modal';
import {UserModalComponent} from "./user-modal/user-modal.component";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input() user!: User;
  showUserDetails: boolean = false;

  constructor(private modalService: BsModalService,
              private eventService: EventService) {
  }

  toggleDetails() {
    this.showUserDetails = !this.showUserDetails;
  }

  onManageUser(): void {
    const initialState = {
      user: this.user,
      onRemoveUserClick: this.onRemoveUserClick.bind(this)
    };
    this.modalService.show(UserModalComponent, {initialState});
  }

  onRemoveUserClick(userId: number): void {
    this.eventService.emitUserRemoval(userId);
  }
}
