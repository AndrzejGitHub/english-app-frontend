import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, switchMap, tap} from "rxjs";
import {User} from "../models/user";
import {environment} from "../environment/environment";
import {LoginData} from "../models/login-date";
import {UserRole} from "../models/user-role.enum";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUserUrl = environment.urlApi + "/api/user";
  private config = {withCredentials: true};
  private loggedUser = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient,
              private eventService : EventService) {
    this.loggedUser.next(null);

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUserUrl}`, {...this.config});
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUserUrl}/${id}`, {...this.config});
  }

  delUser(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUserUrl}/${id}`, {...this.config});
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUserUrl}`, user, {...this.config});
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUserUrl}/${user.id}`, user, {...this.config})
  }

  setLoggedUser(user: User | null) {
    this.loggedUser.next(user);
  }

  getLoggedUser(): Observable<User | null> {
    return this.loggedUser.asObservable();
  }

  login(loginData: LoginData): Observable<User> {
    const body = new FormData();
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    return this.http.post<void>(`${environment.urlApi}/login`, body, {...this.config}).pipe(
      switchMap(() => this.whoAmI()),
      tap(user => {
        this.setLoggedUser(user);
        this.eventService.emitUserLogin();
      })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/logout`, null, {...this.config})
      .pipe(
        tap(()=> {
          this.setLoggedUser(null);
          this.eventService.emitUserLogout();
        })
      );
  }

  whoAmI(): Observable<User> {
    return this.http.get<User>(`${this.apiUserUrl}/who-am-i`, {...this.config});
  }

  hasAdminRole(): boolean {
    const userRoles = this.loggedUser.getValue()?.roles;
    return Array.isArray(userRoles) && userRoles.includes(UserRole.ROLE_ADMIN);
  }

}
