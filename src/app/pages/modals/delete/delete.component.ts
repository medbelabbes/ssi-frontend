import {Component, Inject, OnInit} from '@angular/core';
import {AdminsService} from "../../../services/admins.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  title = ''



  constructor(
    public dialogDelete: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  ngOnInit(): void {
    this.title = this.data.title;
  }


  confirm() {
    this.dialogDelete.close(true);

  }

  cancel() {
    this.dialogDelete.close(false);
  }
}
