import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/User.model";
import {map} from 'rxjs/operators';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  /*******ADMINS********/
  private admins: User[] = [];
  private totalAdmins: number = 0;
  private adminsUpdatedListener = new Subject<{ status: boolean, message: string, admins: User[], count: number }>();
  public adminSavedListener = new Subject<{ status: boolean, message: string, data: any }>()


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAll(page: number, size: number, query: string, role: string) {
    let currentPage = page - 1;
    this.isLoadingSubject.next(true);
    this.http
      .get<{ status: boolean, message: string, data: User[], count: number }>(`${API_URL}admins?page=${currentPage}&size=${size}&query=${query}&role=${role}`, {})
      .pipe(
        map(adminData => {
          return {
            status: adminData.status,
            message: adminData.message,
            admins: adminData.data,
            count: adminData.count,
          };
        }),
      )
      .subscribe({
        next: (transformedAdmins) => {
          this.admins = transformedAdmins.admins;
          this.totalAdmins = transformedAdmins.count;
          this.adminsUpdatedListener.next({
            status: transformedAdmins.status,
            message: transformedAdmins.message,
            admins: [...this.admins],
            count: transformedAdmins.count,
          });
          this.isLoadingSubject.next(false);
        },
        error: (err) => {
          this.adminsUpdatedListener.next({
            status: false,
            message: err.error.message,
            admins: [],
            count: 0,
          });
          this.isLoadingSubject.next(false);
        }
      })

  }

  getAdminsUpdatedListener() {
    return this.adminsUpdatedListener.asObservable();
  }


  save(user: User) {

    this.isLoadingSubject.next(true);


    this.http.post<{ status: boolean, message: string, data: any }>(`${API_URL}admin/save`, user, {})
      .subscribe({
          next: (response: { status: boolean, message: string, data: any }) => {
            this.adminSavedListener.next({
              status: response.status,
              message: response.message,
              data: response.data,
            });
            this.isLoadingSubject.next(false);

          },
          error: (err: any) => {
            this.adminSavedListener.next({
              status: false,
              message: err.error.message,
              data: {},
            });
            this.isLoadingSubject.next(false);

          }
        }
      )
  }

  getAdminSavedListener() {
    return this.adminSavedListener.asObservable();
  }

  getById(id: number) {
    return this.http
      .get<{ status: boolean, message: string, data: User }>(
        `${API_URL}admins/get/${id}`, {});
  }


  edit(user: User) {
    this.isLoadingSubject.next(true);
    const URL = `${API_URL}admin/edit`
    console.log(URL)
    this.http.patch<{ status: boolean, message: string, data: any }>(URL, user, {})
      .subscribe({
          next: (response: { status: boolean, message: string, data: any }) => {
            this.adminSavedListener.next({
              status: response.status,
              message: response.message,
              data: response.data,
            });
            this.isLoadingSubject.next(false);

          },
          error: (err: any) => {
            console.log("error", err)
            this.adminSavedListener.next({
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
