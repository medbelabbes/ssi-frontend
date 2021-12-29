import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {UsersModule} from "./users/users.module";
import {TasksModule} from "./tasks/tasks.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AdminsModule} from "./admins/admins.module";
import {AngularMaterialModule} from "../angular-material.module";
import {HeaderComponent} from './layout/header/header.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {NgxShimmerLoadingModule} from 'ngx-shimmer-loading';


@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UsersModule,
    TasksModule,
    DashboardModule,
    AdminsModule,
    AngularMaterialModule,
    NgxShimmerLoadingModule
  ]
})
export class PagesModule {
}
