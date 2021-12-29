import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
    private cdr: ChangeDetectorRef
  ) {

  }


  ngOnInit() {
    this.titleService.setTitle('SSI');
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);

  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
