import {CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from "../../services/auth.service";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private  router: Router) {
  }

  canActivate() {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    }
    return isAuth;
  }

}
