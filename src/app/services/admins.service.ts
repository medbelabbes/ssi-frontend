import { Injectable } from '@angular/core';
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


}
