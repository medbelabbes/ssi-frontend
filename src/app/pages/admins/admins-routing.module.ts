import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminsComponent} from "./admins.component";
import {AdminsListingComponent} from "./admins-listing/admins-listing.component";
import {AdminAddEditComponent} from "./admin-add-edit/admin-add-edit.component";

const routes: Routes = [
  {
    path : '',
    component: AdminsComponent,
    children: [
      {
        path: 'listing',
        component: AdminsListingComponent
      },
      {
        path: 'add',
        component: AdminAddEditComponent
      },
      {
        path: 'edit/:id',
        component: AdminAddEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
