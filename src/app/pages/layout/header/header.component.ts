import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/User.model";
import {AuthService} from "../../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
export class HeaderComponent implements OnInit {

  @Input()
    // @ts-ignore
  currentUser: User;
  @Input()
    // @ts-ignore
  adminFetched: boolean;

  ProfilePanel = false;
  NotificationsPanel = false;


  public totalNotifications = 0;
  // @ts-ignore
  @Input()
  // @ts-ignore
  public countNotifications;
  isNotificationsLoading = false;

  /*** Conversations ***/
  MessagesPanel = false;
  public conversations: any[] = [];
  // @ts-ignore
  public conversationsSub: Subscription;
  // @ts-ignore
  public unseenMessagesSub: Subscription;
  // @ts-ignore
  public countUnseenMessagesSub: Subscription;
  totalConversations = 0;
  public countMessages = 0;
  isConversationsLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }


  onHideSidebar() {
    // @ts-ignore
    const s: string = document.getElementById('mySidenav').style.getPropertyValue('width');
    if (!(s === '260px')) {
      // @ts-ignore
      document.getElementById('mySidenav').style.cssText = 'width:260px';
      // @ts-ignore
      document.getElementById('router').style.cssText = 'margin-left:260px';
    } else {
      // @ts-ignore
      document.getElementById('mySidenav').style.cssText = 'width:0px';
      // @ts-ignore
      document.getElementById('router').style.cssText = 'margin-left:0';
    }
  }

  OpenProfilePanel() {
    this.ProfilePanel = !this.ProfilePanel;

  }

  goToProfile() {
    this.router.navigate(['pages/settings/general']);

  }

  onOpenSettings() {

  }

  onLogout() {
    this.authService.logout();

  }


  HideMessagesPanel() {
    this.MessagesPanel = !this.MessagesPanel;

  }

  onSeeAllMessages() {

  }

  HideNotificationPanel() {
    this.NotificationsPanel = !this.NotificationsPanel;
  }

  onSeeAllNotifications() {

  }

  goToChat() {
  }
}
