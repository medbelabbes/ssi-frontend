import {Component, OnInit} from '@angular/core';
import {AdminsService} from "../../../services/admins.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";
import {Role} from "../../../models/Role.model";
import {RolesService} from "../../../services/roles.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-add-edit',
  templateUrl: './admin-add-edit.component.html',
  styleUrls: ['./admin-add-edit.component.scss']
})
export class AdminAddEditComponent implements OnInit {

  /*********GENERAL ************/
  isLoading = false;
  isAdmin = false;

  public href = '';
  mode = 'create';
  saved: boolean = false;


  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  adminSub: Subscription;
  admin: User = new User();
  adminFetched: boolean = false;
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
    private adminsService: AdminsService,
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

    this.rolesService.getAdminRoles(this.currentRolePage, this.rolesPerPage);
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
      this.titleService.setTitle('Add admin');

    } else if (this.href.includes('edit')) {
      this.titleService.setTitle('Edit admin');
      this.isNew = false;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'Edit';
          this.isLoading = true;
          this.admin.id = Number(paramMap.get('id'));
          this.adminsService.getById(this.admin.id).subscribe(adminData => {
            this.admin = adminData.data;
            this.form.controls['password'].clearValidators();
            this.form.controls['password'].updateValueAndValidity();
            if (this.admin) {
              this.adminFetched = true;
              this.isLoading = false;
              this.form.setValue({
                  name: this.admin.name,
                  username: this.admin.username,
                  email: this.admin.email,
                  password: this.admin.password,
                  role: this.admin.roles ? this.admin.roles[0] : new Role(),
                  status: this.admin.status,
                }
              );
            }
          });
        }
      })
    }

    this.adminSub = this.adminsService.getAdminSavedListener()
      .subscribe({
        next: (res) => {
          if (res.status) {

          }
          this.adminsService.isLoadingSubject.next(false)
          this.isLoading = false;

        },
        error: (err) => {
          console.log(err)
          this.isLoading = false;

          this.adminsService.isLoadingSubject.next(false)

        }
      })
  }

  goBackToAdminsListing() {
    this.router.navigate(['admins'])
  }

  onSave() {
    this.isLoading = true
    this.adminsService.isLoadingSubject.next(false)
    if (this.form.invalid) {
      this.adminsService.isLoadingSubject.next(false)
      return;
    }

    const user: User = {
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      status: this.form.value.status,
      roles: [this.form.value.role]
    }
    if (this.isNew) {
      this.adminsService.save(user);
    } else {
      user.id = this.admin.id;
      delete user.password;
      console.log(user)
      this.adminsService.edit(user);

    }
  }

  discard() {


  }
}
