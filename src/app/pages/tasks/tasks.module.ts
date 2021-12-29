import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TasksListingComponent } from './tasks-listing/tasks-listing.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';


@NgModule({
  declarations: [
    TasksComponent,
    TasksListingComponent,
    TaskAddEditComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
