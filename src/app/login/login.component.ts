import {Component} from '@angular/core';
import {LoginData} from "../models/login-date";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = this.fb.group({
    username: ['basia@wp.pl', [Validators.required, Validators.maxLength(20)]],
    password: ['@Basia@1234', [Validators.required, Validators.maxLength(20)]],
    rememberMe: false,
  });
  public error: string | null = null;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router) {
  }

  login(): void {
    if (this.form.invalid) {
      return alert("Please enter valid data");
    }
    const loginData = this.form.value as LoginData;
    this.userService.login(loginData)
      .pipe(switchMap(value => this.userService.whoAmI()))
      .subscribe({
        next: value => {
          this.userService.setLoggedUser(value);
          this.router.navigate(['/vocabularies']).then(() => {
          }).catch(error => {
            this.error = 'An error occurred while redirecting to the vocabularies page: ' + error.message;
          });
        },
        error: error => console.error(error),
      });
  }

  logout(): void {
    this.userService.logout()
      .subscribe({
        next: () => {
          this.userService.setLoggedUser(null);
        },
        error: error => console.error(error),
      });
  }
}
