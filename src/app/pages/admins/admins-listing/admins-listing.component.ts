import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User.model";
import {PageEvent} from "@angular/material/paginator";
import {AdminsService} from "../../../services/admins.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DeleteComponent} from "../../modals/delete/delete.component";
import {MatDialog} from "@angular/material/dialog";
import {error} from "jquery";

@Component({
  selector: 'app-admins-listing',
  templateUrl: './admins-listing.component.html',
  styleUrls: ['./admins-listing.component.scss']
})
export class AdminsListingComponent implements OnInit {
  /*********GENERAL ************/
  isLoading = false;
  // @ts-ignore
  private adminsSub: Subscription;

  status = false;

  admins: User[] = [];
  totalAdmins = 0;
  adminsPerPage = 10;
  currentAdminsPage = 1;
  adminsPageSizeOptions = [10, 50, 100];
  message = '';
  searchQuery = '';
  role = 'ROLE_SUPER_ADMIN';
  isLoading$: Observable<boolean>;


  constructor(
    public dialog: MatDialog,
    private adminsService: AdminsService,
    private router: Router
  ) {
    this.isLoading$ = this.adminsService.isLoading$;

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.adminsService.getAll(
      this.currentAdminsPage,
      this.adminsPerPage,
      this.searchQuery,
      this.role);

    this.adminsSub = this.adminsService
      .getAdminsUpdatedListener()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.message = res.message;
          this.admins = res.admins;
          this.totalAdmins = res.count;
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

  onSearchAdmins($event: any) {
    this.searchQuery = $event.target.value;
    this.adminsService.getAll(
      this.currentAdminsPage,
      this.adminsPerPage,
      this.searchQuery,
      this.role);

  }

  goToAddAdmin() {
    this.router.navigate(['admins', 'add'])
  }

  onOpenAdminDetails(admin: User) {

  }

  onEdit(admin: User) {
    this.router.navigate(['admins', 'edit', admin.id])
  }

  onDelete(admin: User) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        title: `${admin.name}`
      },

    });

    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          if(res) {
            this.adminsService.delete(admin).subscribe({
              next: (response) => {
                this.adminsService.getAll(
                  this.currentAdminsPage,
                  this.adminsPerPage,
                  this.searchQuery,
                  this.role);
              },
              error: (error) => {

              }
            })
          }
        },
        error: (err) => {

        }
      })
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentAdminsPage = pageData.pageIndex + 1;
    this.adminsPerPage = pageData.pageSize;

  }

  onChangeStatus(admin: User) {

  }
}
