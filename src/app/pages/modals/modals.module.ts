import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import {AngularMaterialModule} from "../../angular-material.module";



@NgModule({
  declarations: [
    DeleteComponent
  ],
    imports: [
        CommonModule,
        AngularMaterialModule
    ]
})
export class ModalsModule { }
