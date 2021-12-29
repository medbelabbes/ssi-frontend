import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {USER} from "../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;


  public message = '';
  public isLoading = false;
  // @ts-ignore
  private loginSub: Subscription;

  errorAuth = false; // test if authentication successed of failed
  hide = true;


  constructor(
    private titleService: Title,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router) {
    this.titleService.setTitle('Login');
  }

  ngOnInit() {
    /**** form validation ***/
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required,]}),
      password: new FormControl(null, {validators: [Validators.required]}),
    });

    this.errorAuth = false;
    this.loginSub = this.authService.getUserLoggedListener()
      .subscribe({
        next: (res) => {
          this.isLoading = true;
          if (res.status) {
            this.storeToken(res.data.accessToken, res.data.refreshToken);
            this.router.navigate(['dashboard']).then(res => {
              console.log('to dashboard')
            });
          } else {
            this.isLoading = false;
            this.errorAuth = true;
            this.message = res.message;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorAuth = true;
          this.message = err.message;
        }
      })
  }


  onSignIn() {
    console.log(this.form.value.username)
    console.log(this.form.value.password)
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.login(this.form.value.username, this.form.value.password);

  }

  onForgetPassword() {
    this.router.navigate(['/reset-password']);
  }

  storeToken(accessToken: string, refreshToken: string) {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }


}
