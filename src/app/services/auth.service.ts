import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.api = environment.apiURL;
  }


  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    // Check whether the token is expired and return
    // true or false
    return accessToken != null && accessToken !== '';
  }

  public getCurrentUser() {
    return this.http.get<{ status: boolean, message: string, data: any }>(`${this.api}auth/current`);
  }

}
