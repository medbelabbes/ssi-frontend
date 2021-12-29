import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users.component";
import {UsersListingComponent} from "./users-listing/users-listing.component";
import {UserAddEditComponent} from "./user-add-edit/user-add-edit.component";

const routes: Routes = [
  {
    path : '',
    component: UsersComponent,
    children: [
      {
        path: 'listing',
        component: UsersListingComponent
      },
      {
        path: 'add',
        component: UserAddEditComponent
      },
      {
        path: 'edit/:id',
        component: UserAddEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
