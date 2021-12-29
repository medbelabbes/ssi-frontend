import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {DashboardDetailsComponent} from "./dashboard-details/dashboard-details.component";

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'detail',
      component: DashboardDetailsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
