import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/User.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";


const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  /*******User********/
  private users: User[] = [];
  private totalUsers: number = 0;
  private usersUpdatedListener = new Subject<{ status: boolean, message: string, users: User[], count: number }>();
  public userSavedListener = new Subject<{ status: boolean, message: string, data: any }>()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAll(page: number, size: number, query: string) {
    let currentPage = page - 1;
    this.isLoadingSubject.next(true);
    this.http
      .get<{ status: boolean, message: string, data: User[], count: number }>(`${API_URL}users?page=${currentPage}&size=${size}&query=${query}`, {})
      .pipe(
        map(userData => {
          return {
            status: userData.status,
            message: userData.message,
            users: userData.data,
            count: userData.count,
          };
        }),
      )
      .subscribe({
        next: (transformedUsers) => {
          this.users = transformedUsers.users;
          this.totalUsers = transformedUsers.count;
          this.usersUpdatedListener.next({
            status: transformedUsers.status,
            message: transformedUsers.message,
            users: [...this.users],
            count: transformedUsers.count,
          });
          this.isLoadingSubject.next(false);
        },
        error: (err) => {
          this.usersUpdatedListener.next({
            status: false,
            message: err.error.message,
            users: [],
            count: 0,
          });
          this.isLoadingSubject.next(false);
        }
      })

  }

  getUsersUpdatedListener() {
    return this.usersUpdatedListener.asObservable();
  }

  save(user: User) {

    this.isLoadingSubject.next(true);


    this.http.post<{ status: boolean, message: string, data: any }>(`${API_URL}user/save`, user, {})
      .subscribe({
          next: (response: { status: boolean, message: string, data: any }) => {
            this.userSavedListener.next({
              status: response.status,
              message: response.message,
              data: response.data,
            });
            this.isLoadingSubject.next(false);

          },
          error: (err: any) => {
            this.userSavedListener.next({
              status: false,
              message: err.error.message,
              data: {},
            });
            this.isLoadingSubject.next(false);

          }
        }
      )
  }

  getUserSavedListener() {
    return this.userSavedListener.asObservable();
  }

  getById(id: number) {
    return this.http
      .get<{ status: boolean, message: string, data: User }>(
        `${API_URL}users/get/${id}`, {});
  }

  edit(user: User) {
    this.isLoadingSubject.next(true);
    const URL = `${API_URL}user/edit`
    console.log(URL)
    this.http.patch<{ status: boolean, message: string, data: any }>(URL, user, {})
      .subscribe({
          next: (response: { status: boolean, message: string, data: any }) => {
            this.userSavedListener.next({
              status: response.status,
              message: response.message,
              data: response.data,
            });
            this.isLoadingSubject.next(false);

          },
          error: (err: any) => {
            console.log("error", err)
            this.userSavedListener.next({
              status: false,
              message: err.error.message,
              data: {},
            });
            this.isLoadingSubject.next(false);

          }
        }
      )
  }


}
