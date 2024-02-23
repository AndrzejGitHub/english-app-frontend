import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public error: string | null = null;
  loggedUser: User | null = null;
  constructor(public userService: UserService,
              private router : Router) {

  }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(user => this.loggedUser = user);
  }

  goToLogin(): void {
    this.router.navigate(['/login']).then(() => {
    }).catch(error => {
      this.error = 'An error occurred while redirecting to the login page: ' + error.message;
    });
  }

  logout(): void {
    this.userService.logout().subscribe(() => {});
  }


}
