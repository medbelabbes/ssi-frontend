import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {User} from "../../../models/User.model";
import {UsersService} from "../../../services/users.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  /*********GENERAL ************/
  isLoading = false;
  // @ts-ignore
  private usersSub: Subscription;

  status = false;

  users: User[] = [];
  totalUsers = 0;
  usersPerPage = 10;
  currentUsersPage = 1;
  usersPageSizeOptions = [10, 50, 100];
  message = '';
  searchQuery = '';
  role = 'ROLE_SUPER_ADMIN';
  isLoading$: Observable<boolean>;


  constructor(
    private usersService: UsersService
  ) {
    this.isLoading$ = this.usersService.isLoading$;

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getAll(
      this.currentUsersPage,
      this.usersPerPage,
      this.searchQuery);

    this.usersSub = this.usersService
      .getUsersUpdatedListener()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.message = res.message;
          this.users = res.users;
          this.totalUsers = res.count;
        },
        error: (err) => {
          this.isLoading = false;
          this.message = err.error.message;
        }
      })
    // .subscribe((usersData: { status: boolean, message: string, users: User[], count: number }) => {

    // }, err => {
    //
    // });
  }

  onSearchUsers($event: any) {
    this.searchQuery = $event.target.value;
    this.usersService.getAll(
      this.currentUsersPage,
      this.usersPerPage,
      this.searchQuery);

  }

  goToAddUser() {

  }

  onOpenUserDetails(user: User) {

  }

  onEdit(user: User) {

  }

  onDelete(user: User) {

  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentUsersPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;

  }

  onChangeStatus(user: User) {

  }
}
