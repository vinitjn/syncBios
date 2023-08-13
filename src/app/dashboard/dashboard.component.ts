import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import{tagMediaDetails} from '../models/tagPeopleDetails';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tagPerpleDetailsData : tagMediaDetails[];
  constructor(public dialog: MatDialog) { 
    this.tagPerpleDetailsData=[];
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: '', animal: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.tagPerpleDetailsData.push(result);
      // this.animal = result;
    });
  }
  ngOnInit() {
    
  }
  addPeople(){
    this.openDialog();
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  tagPerpleDetailsData : tagMediaDetails={
    name: '',
    personMediaId : '',
    socialMediaId : '',
    verifyPersonUrl : ''
  };
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: tagMediaDetails) {}

  onNoClick(): void {
    console.log(this.tagPerpleDetailsData);
    this.data = this.tagPerpleDetailsData;
    this.dialogRef.close(this.data);
  }

}