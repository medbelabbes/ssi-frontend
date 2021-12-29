import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  public loginSubListener = new Subject<{status: boolean, message: string, data: any }>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    // Check whether the token is expired and return
    // true or false
    return accessToken != null && accessToken !== '';
  }

  login(username: string, password: string) {

    this.isLoadingSubject.next(true);
    const body = {
      username,
      password
      };

    this.http.post<{ status: boolean, message: string, data: any }>(`${API_URL}auth/login`, body, {})
      .subscribe({
          next: (response: { status: boolean, message: string, data: any }) => {
            this.loginSubListener.next({
              status: response.status,
              message: response.message,
              data: response.data,
            });
            this.isLoadingSubject.next(false);

          },
          error: (err: any) => {
            this.loginSubListener.next({
              status: false,
              message: err.error.message,
              data: {},
            });
            this.isLoadingSubject.next(false);

          }
        }
      )
  }

  getUserLoggedListener() {
    return this.loginSubListener.asObservable();
  }


  public getCurrentUser() {
    return this.http.get<{ status: boolean, message: string, data: any }>(`${API_URL}auth/current`);
  }

}
