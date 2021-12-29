import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../models/MenuItem.model";
import {User} from "../../../models/User.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
    // @ts-ignore
  currentUser: User;
  @Input()
    // @ts-ignore
  typeUser: string;

  @Input()
    // @ts-ignore
  adminFetched: boolean;

  menu: MenuItem[] = [];
  isLoading = false;

  public currentPage = 1;

  constructor(
    private authService: AuthService,
    private router: Router,

  ) {
    this.getCurrentUrl();
    this.menu = [
      {
        id: 0,
        title: 'Dashboard',
        link: '/dashboard',
        icon: 'home'
      },
      {
        id: 1,
        title: 'Admins',
        link: '/admins/listing',
        icon: 'admin_panel_settings'
      },
      {
        id: 2,
        title: 'Users',
        link: '/users/listing',
        icon: 'people'
      },
      {
        id: 3,
        title: 'Tasks',
        link: '/tasks/listing',
        icon: 'task'
      },
      {
        id: 4,
        title: 'Logout',
        link: '',
        icon: 'logout'
      }
    ]
    this.isLoading = false;

  }

  ngOnInit(): void {
  }

  public getCurrentUrl() {
    console.log('this.router.url', this.router.url)
    if (this.router.url) {
      const subUrl = this.router.url.slice(0, this.router.url.length);
      console.log('subUrl',subUrl)
      this.switchUrl(subUrl);
    }
    this.router.events.subscribe(() => {
      let url: string = this.router.url;
      url = url.slice(0, url.length);
      this.switchUrl(url);
    });
  }

  switchUrl(subUrl: string) {
    if (subUrl === '') {
      this.currentPage = 0;
    }
    switch (subUrl) {
      case '/dashboard' : {
        this.currentPage = 0;
        break;
      }

      case '/admins/listing' : {
        this.currentPage = 1;
        break;
      }

      case '/users/listing' : {
        this.currentPage = 2;
        break;
      }

      case '/tasks/listing' : {
        this.currentPage = 3;
        break;
      }
    }
  }

  onClick(id: number) {
    switch (id) {
      case 4:
        this.authService.logout();
    }

  }
}
