import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { AdminAddEditComponent } from './admin-add-edit/admin-add-edit.component';
import { AdminsListingComponent } from './admins-listing/admins-listing.component';


@NgModule({
  declarations: [
    AdminsComponent,
    AdminAddEditComponent,
    AdminsListingComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule
  ]
})
export class AdminsModule { }