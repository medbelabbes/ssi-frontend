import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Role} from "../models/Role.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";


const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  /*******ADMINS********/
  private roles: Role[] = [];
  private totalRoles: number = 0;
  private rolesUpdatedListener = new Subject<{ status: boolean, message: string, roles: Role[], count: number }>();
  public roleSavedListener = new Subject<{ status: boolean, message: string, data: any }>()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAdminRoles(page: number, size: number) {
    let currentPage = page - 1;
    this.isLoadingSubject.next(true);
    this.http
      .get<{ status: boolean, message: string, data: Role[], count: number }>(`${API_URL}roles/admin-roles?page=${currentPage}&size=${size}`, {})
      .pipe(
        map(roleData => {
          return {
            status: roleData.status,
            message: roleData.message,
            roles: roleData.data,
            count: roleData.count,
          };
        }),
      )
      .subscribe({
        next: (transformedRoles) => {
          this.roles = transformedRoles.roles;
          this.totalRoles = transformedRoles.count;
          this.rolesUpdatedListener.next({
            status: transformedRoles.status,
            message: transformedRoles.message,
            roles: [...this.roles],
            count: transformedRoles.count,
          });
          this.isLoadingSubject.next(false);
        },
        error: (err) => {
          this.rolesUpdatedListener.next({
            status: false,
            message: err.error.message,
            roles: [],
            count: 0,
          });
          this.isLoadingSubject.next(false);
        }
      })

  }

  getRolesUpdatedListener() {
    return this.rolesUpdatedListener.asObservable();
  }
}
