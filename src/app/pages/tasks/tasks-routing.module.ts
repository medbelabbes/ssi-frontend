import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./tasks.component";
import {TasksListingComponent} from "./tasks-listing/tasks-listing.component";
import {TaskAddEditComponent} from "./task-add-edit/task-add-edit.component";

const routes: Routes = [
  {
    path : '',
    component: TasksComponent,
    children: [
      {
        path: 'listing',
        component: TasksListingComponent
      },
      {
        path: 'add',
        component: TaskAddEditComponent
      },
      {
        path: 'edit/:id',
        component: TaskAddEditComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
