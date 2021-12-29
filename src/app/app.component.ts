import {Component, OnInit} from '@angular/core';
import {User} from "./models/User.model";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

export let USER: User = new User();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ssi-frontend';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        if (res.status) {
          USER = res.data;
        } else {
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
