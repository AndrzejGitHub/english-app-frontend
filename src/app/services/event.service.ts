import {Injectable} from '@angular/core';
import { Subject} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private userUpdate = new Subject<User>();
  private userInsert = new Subject<User>();
  private userRemoval = new Subject<number>();
  private userLogin = new Subject<void>();
  private userLogout = new Subject<void>();

  userUpdate$ = this.userUpdate.asObservable();
  userInsert$ = this.userInsert.asObservable();
  userRemoval$ = this.userRemoval.asObservable();

  private translationRemoval = new Subject<number>();
  translationRemoval$ = this.translationRemoval.asObservable();

  emitUserRemoval(userId: number) {
    this.userRemoval.next(userId);
  }

  emitUserUpdate(user: User) {
    this.userUpdate.next(user);
  }

  emitUserInsert(user: User) {
    this.userInsert.next(user);
  }

  emitUserLogin() {
    this.userLogin.next();
  }
  emitUserLogout() {
    this.userLogout.next();
  }

  emitTranslationRemoval(translationId: number) {
    this.translationRemoval.next(translationId);
  }

}
