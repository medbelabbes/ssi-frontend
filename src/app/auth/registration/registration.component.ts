import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;


  public message = '';
  public isLoading = false;
  // @ts-ignore
  private registerSub: Subscription;

  error = false; //
  hide = true;


  constructor(
    private titleService: Title,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router) {
    this.titleService.setTitle('Register');
  }

  ngOnInit() {
    /**** form validation ***/
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required,]}),
      username: new FormControl(null, {validators: [Validators.required,]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]}),
    });

    this.error = false;
    this.registerSub = this.authService.getUserRegisteredListener()
      .subscribe({
        next: (res) => {
          this.isLoading = true;
          if (res.status) {
            this.router.navigate(['auth', 'login']).then(res => {
            });
          } else {
            this.isLoading = false;
            this.error = true;
            this.message = res.message;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = true;
          this.message = err.message;
        }
      })
  }


  onRegister() {
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    const user: User = {
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      status: 'VALIDATED',
    }
    this.authService.register(user);

  }

}
