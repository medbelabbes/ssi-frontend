import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public active_page = 1;
  isLoading = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
  ) {

  }


  ngOnInit() {
    this.titleService.setTitle('TopFood - Dashboard');
    this.isLoading = true;
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        if (res.status) {
          this.router.navigate(['/dashboard']);
        } else {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
