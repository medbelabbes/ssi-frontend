import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import {AngularMaterialModule} from "../../angular-material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersComponent,
    UsersListingComponent,
    UserAddEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
