import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../models/User.model";
import {Role} from "../../../models/Role.model";
import {Title} from "@angular/platform-browser";
import {UsersService} from "../../../services/users.service";
import {RolesService} from "../../../services/roles.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  /*********GENERAL ************/
  isLoading = false;
  isUser = false;

  public href = '';
  mode = 'create';
  saved: boolean = false;


  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  userSub: Subscription;
  user: User = new User();
  userFetched: boolean = false;
  userStatus = [
    'BANNED',
    'PENDING',
    'VALIDATED',
  ];

  roles: Role[] = [];
  // @ts-ignore
  rolesSub: Subscription;
  currentRolePage = 1;
  rolesPerPage = 1000;
  isRolesLoading$: Observable<boolean>;
  isNew = true;

  constructor(
    private titleService: Title,
    private usersService: UsersService,
    private rolesService: RolesService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
  ) {
    this.isRolesLoading$ = this.rolesService.isLoading$;

    /**** form validation ***/
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required,]}),
      username: new FormControl(null, {validators: [Validators.required,]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      status: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      role: new FormControl(null, {validators: [Validators.required]}),
    });


  }

  ngOnInit(): void {

    this.rolesService.getUserRoles(this.currentRolePage, this.rolesPerPage);
    this.rolesSub = this.rolesService
      .getRolesUpdatedListener()
      .subscribe({
        next: (res) => {
          this.roles = res.roles
        },
        error: (err) => {
          this.roles = []

        }
      })

    this.href = this.router.url;
    if (this.href.includes('add')) {
      this.mode = 'create';
      this.titleService.setTitle('Add user');

    } else if (this.href.includes('edit')) {
      this.titleService.setTitle('Edit user');
      this.isNew = false;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'Edit';
          this.isLoading = true;
          this.user.id = Number(paramMap.get('id'));
          this.usersService.getById(this.user.id).subscribe(userData => {
            this.user = userData.data;
            this.form.controls['password'].clearValidators();
            this.form.controls['password'].updateValueAndValidity();
            if (this.user) {
              this.userFetched = true;
              this.isLoading = false;
              this.form.setValue({
                  name: this.user.name,
                  username: this.user.username,
                  email: this.user.email,
                  password: this.user.password,
                  role: this.user.roles ? this.user.roles[0] : new Role(),
                  status: this.user.status,
                }
              );
            }
          });
        }
      })
    }

    this.userSub = this.usersService.getUserSavedListener()
      .subscribe({
        next: (res) => {
          if (res.status) {

          }
          this.usersService.isLoadingSubject.next(false)
          this.isLoading = false;

        },
        error: (err) => {
          console.log(err)
          this.isLoading = false;

          this.usersService.isLoadingSubject.next(false)

        }
      })
  }

  goBackToUsersListing() {
    this.router.navigate(['users'])
  }

  onSave() {
    this.isLoading = true
    this.usersService.isLoadingSubject.next(false)
    if (this.form.invalid) {
      this.usersService.isLoadingSubject.next(false)
      return;
    }

    const user: User = {
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      status: this.form.value.status,
      roles: [this.form.value.role],
      tasks: []
    }
    if (this.isNew) {
      this.usersService.save(user);
    } else {
      user.id = this.user.id;
      delete user.password;
      this.usersService.edit(user);

    }
  }

  discard() {


  }
}
