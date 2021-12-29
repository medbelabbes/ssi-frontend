import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {User} from "../models/User.model";
import {HeaderComponent} from "./layout/header/header.component";
import {Subscription} from "rxjs";
import {USER} from "../app.component";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({
            opacity: 0,
          }),
          animate('150ms',
            style({
              opacity: 1
            }))
        ]),
        transition(':leave', [
          style({
            opacity: 1
          }),
          animate('150ms', style(
            {
              opacity: 0
            }))
        ])
      ]
    )
  ],
})
export class PagesComponent implements OnInit, OnDestroy {

  /**** general *****/
  currentUser: User = new User();
  typeUser: string = '';
  // @ts-ignore
  idUser: number;
  order: any;
  feedback: any;

  isLoading = false;
  adminFetched = false;
  public loggedIn = false;

  /********Auth Data***********/
  userIsAuthenticated = false;

  /***** Notificaitons **********/

  public countNotifications = 0;
  public notification: any;


  // @ts-ignore
  @ViewChild(HeaderComponent, {static: false}) headerComponent: HeaderComponent;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = USER
    if(this.currentUser && this.currentUser.id) {
      this.adminFetched = true;
      this.typeUser = this.currentUser.roles && this.currentUser.roles.length ? this.currentUser.roles[0].name : '';
    }
  }

  ngOnDestroy(): void {
  }

  onClickedOut(event: any) {
    const target = event.target.className;
    if (target !== 'notification-title' && target !== 'far fa-bell') {
      this.headerComponent.NotificationsPanel = false;
    }

    if (target !== 'message-title' && target !== 'far fa-envelope') {
      this.headerComponent.MessagesPanel = false;
    }

    if (target !== 'owner-name') {
      this.headerComponent.ProfilePanel = false;
    }


  }
}
