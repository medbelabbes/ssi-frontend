import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
