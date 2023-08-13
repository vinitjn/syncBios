import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { userSocialMediaMapping } from '../models/userSocialMediaMapping';
import { SyncTreeServicesService } from '../Services/sync-tree-services.service';
import { FormsModule } from '@angular/forms';
import { tagMediaDetails } from '../models/tagPeopleDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { userSocialMediaImageMapping } from '../models/userSocialMediaImageMapping';
import { userSocialMediaLogo } from '../models/userSocialMediaLogo';
import { Overlay } from '@angular/cdk/overlay';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { users } from '../models/user';

interface Video {
  id: string;
  name: string;
}
const VIDEOS: Video[] = [
  {
    id: 'PRQCAL_RMVo',
    name: 'Instructional',
  },
  {
    id: 'O0xx5SvjmnU',
    name: 'Angular Conf',
  },
  {
    id: 'invalidname',
    name: 'Invalid',
  },
];
@Component({
  selector: 'app-sync-tree-data',
  templateUrl: './sync-tree-data.component.html',
  styleUrls: ['./sync-tree-data.component.css'],
  providers: [SyncTreeServicesService]
})
export class SyncTreeDataComponent implements AfterViewInit, OnInit {

  userSocialMaps: userSocialMediaMapping[] = [];
  cntr: number = 1;
  isEditMode: boolean = true;
  filedata: File;
  file: File = null;
  // background : string = 'url(/img/' + '../../assets/backg.jpg' + ')';
  // adidasBack: string = 'url(/img/' + '../../assets/ske.jpg' + ')';
  background: string = 'url(/img/' + '../../assets/ske.jpg' + ')';
  videoId = '-4JV4hur1PM';
  fontFamily = this.sanitizer.bypassSecurityTrustStyle('cursive');
  showEditRegion : Boolean = true;
  userSocialMediaImageMapping: userSocialMediaImageMapping = {
    id: 0,
    userSocialMediaMappingId: 0,
    Value: null
  };
  myStyle(style: string) {
    return JSON.parse(style);
  }
  userSocialMediaLogo: userSocialMediaLogo = {
    id: 0,
    logo: null,
    userSocialMediaMappingId: 0
  }

  readonly userid: number = 1;
  readonly userSocialMediaMappingId: number = 0;

  user : users ={
    email : '',
    firstName : '',
    id : 1,
    lastName : '',
    mobileNumber : '',
    password : '',
    userName : '',
    Aboutme : '',
    Domain : '',
    profilePic : '',
    backgroundImage : ''
  }
  constructor(private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, public syncTreeServicesService: SyncTreeServicesService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private overlay: Overlay, private router: Router) { }

  openDialog(type: string): void {
    const dialogRef = this.dialog.open(SyncTreeDataDialog, {
      width: '250px',
      data: { name: '', animal: '' }
    });
    dialogRef.afterClosed().subscribe((result: userSocialMediaMapping) => {
      console.log('The dialog was closed');
      if (result) {
        result.type = type;
        this.userSocialMediaLogo.logo = result.fileData;
        if (result.styles && result.styles === null || result.styles === '') {
          if (result.type == 'LINK') {
            result.styles = '{"font-family":"cursive","background":"white","border":"3px outset black", \r\n"font-style": "italic", "font-size" : "larger", "border-radius": "30px"}';
          }
          if (result.type == 'IMAGE') {
            result.styles = '{"border-radius": "30px"}';
          }
        }
        this.updateSocialMedia(result);
      }
      // this.animal = result;
    });

  }

  openImageDialog(type: string, isSequenceReqd = true, userSocial: userSocialMediaMapping): void {
    const dialogRef = this.dialog.open(AddImageDialog, {
      width: '250px',
      data: { name: '', animal: '' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);

      this.userSocialMediaImageMapping.userSocialMediaMappingId = 0;
      this.userSocialMediaImageMapping.Value = result;
      let usermapData: userSocialMediaMapping = {
        id: 0,
        socialMediaId: 0,
        socialMediaLink: null,
        type: type,
        userId: this.userid,
        value: '',
        logo: '',
        fileData: null,
        styles: '',
        styleObject: null,
        sequence: 0,
        title: '',
        formValues : ''
      }
      if (usermapData.styles == '') {
        usermapData.styles = '{"border-radius": "30px"}';
      }
      if(!isSequenceReqd && userSocial ){
        this.userSocialMediaImageMapping.userSocialMediaMappingId = userSocial.id;
      }
      if(type == 'PROFILEIMAGE'){
        this.updateProfileImage(result);
        
      }
      else{
        this.updateSocialMedia(usermapData, isSequenceReqd);
      }
      // this.animal = result;
    });

  }

  openForm(userData: userSocialMediaMapping) {
    this.openFormDialog(userData)
  }

  updatePostImage() {
    this.syncTreeServicesService.updatePostImage(this.userSocialMediaImageMapping, this.userid).subscribe(response => {
      console.log(response);
      this.userSocialMaps = response.value;
      this.formatUrl();
    }

    )
  }

  redirectDomain(){
    this.router.navigate(['/aboutme']);
  }

  redirectAnalytics(){
    this.router.navigate(['/analytics']);
  }
  
  updatePostLogo() {
    if (this.userSocialMediaLogo && this.userSocialMediaLogo.logo != null && this.userSocialMediaLogo.logo.name != '') {
      this.syncTreeServicesService.updatePostLogo(this.userSocialMediaLogo, this.userid).subscribe(response => {
        console.log(response);
        this.userSocialMaps = response.value;
        this.formatUrl();
      }

      )
    }

  }

  openFormDialog(userData: userSocialMediaMapping): void {
    const dialogRef = this.dialog.open(formDialog, {
      width: '250px',
      data: { title: userData.title, fields : userData.socialMediaLink }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        let obj = {};
        result.forEach(item => obj[item] = item);

        // #2 Converting the object to JSON...
        let json = JSON.stringify(obj);
        userData.formValues = json;
        this.socialMediaUpdate(userData);
      }
      // this.animal = result;
    });

  }
  getUsers(){
    this.syncTreeServicesService.getUsers(this.userid).subscribe( response => {
      this.user = response;
      this.user.profilePic = ('data:image/png;base64,' + this.user.profilePic);
      this.background = 'url(' + 'data:image/png;base64,' + this.user.backgroundImage + ')'
    })
  }

  openSocialLinksDialog(): void {
    const dialogRef = this.dialog.open(SocialMediaShareLinks, {
      width: '250px',
      data: { name: '', animal: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.updateSocialMedia(result);
      }
      // this.animal = result;
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    var url = this.route.snapshot;
    //for mobile preview
    //     window.open ("http://www.javascript-coder.com",
    // "mywindow","menubar=1,resizable=1,width=300,height=350");
    this.getSocialMediaUserDetails(0);
    this.getUsers();

  }
  addLink(type: string) {
    this.openDialog(type);
  }

  addImage(type: string, isSequenceReqd = true, userSocial: userSocialMediaMapping) {
    this.openImageDialog(type, isSequenceReqd, userSocial);
  }

  showStyleDialog(result: userSocialMediaMapping) {
    const dialogRef = this.dialog.open(StyleDialog, {
      width: '250px',
      data: { title: 'this is title' },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.componentInstance.onSubmitReason.subscribe((data: keyValuePair) => {
      console.log('dialog data', data);
      result;
      this.userSocialMaps.forEach((res) => {
        if (res.id == result.id) {
          res.styles = this.getUpdatedStyles(data, res.styles);
        }
      });
      this.formatUrl();
      //i can see 'hello' from MatDialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.updateSocialMedia(result);
      }
      // this.animal = result;
    });
  }

  getUpdatedStyles(stylesObject: keyValuePair, style: string): string {

    switch (stylesObject.key) {
      case "font-family": {
        return style.replace(style.split(',')[0].split(':')[1], '"' + stylesObject.value + '"');
      }
      case "background": {
        return style.replace(style.split(',')[1].split(':')[1], '"' + stylesObject.value + '"');
      }
      case "font-style": {
        return style.replace(style.split(',')[3].split(':')[1], '"' + stylesObject.value + '"');
      }
      case "font-size": {
        return style.replace(style.split(',')[4].split(':')[1], '"' + stylesObject.value + '"');
      }
      case "border-radius": {
        return style.replace(style.split(',')[5].split(':')[1], '"' + stylesObject.value + '"}');
      }
    }
    return '';
  }

  updateProfileImage(fileData : File){
    this.syncTreeServicesService.updateProfileImage(this.userid, fileData).subscribe((Response) => {
      console.log(Response);
      this.getUsers();
    });
  }
  
  updateSocialMedia(result: userSocialMediaMapping, isSequenceReqd = true) {
    if(isSequenceReqd && this.userSocialMaps.length > 0){
      result.sequence = Math.max(...this.userSocialMaps.map(o => o.sequence))+1;
    }
    if(isSequenceReqd){
      this.syncTreeServicesService.updateUserSocialMedia(result).subscribe((Response) => {
        console.log(Response);
        this.userSocialMaps = Response.value;
  
        console.log(this.userSocialMaps);
        if (result && result.type == "IMAGE") {
          this.userSocialMediaImageMapping.userSocialMediaMappingId = Response.value[Response.value.length - 1].id;
          this.updatePostImage();
        }
        if (result && result.type == "LINK") {
          this.userSocialMediaLogo.userSocialMediaMappingId = Response.value[Response.value.length - 1].id;
          this.updatePostLogo();
        }
        this.formatUrl();
      });
    }
   else{
    this.updatePostImage();
   }

  }

  updateSequence(result: userSocialMediaMapping, maxcount : number) {
    this.syncTreeServicesService.updateSequence(result).subscribe((Response) => {
      console.log(Response);
      if(Response.value.length == maxcount){
        this.getSocialMediaUserDetails(this.userid)
      }
    });

  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
    this.uploadBackgroundImageFile();
  }

  formatUrl() {
    this.userSocialMaps.forEach(function (value) {
      if (value && value.value != null && !value.value.includes('data:image')) {
        value.value = ('data:image/png;base64,' + value.value)
      }
      if (value && value.logo != null && !value.logo.includes('data:image')) {
        value.logo = ('data:image/png;base64,' + value.logo)
      }
      if (value && value.styles != null && value.styles != '') {
        value.styleObject = JSON.parse(value.styles);
      }

    });
    this.userSocialMaps.sort((a, b) => a.sequence > b.sequence ? 1 : -1);
  }

  openStyleDialog(result: userSocialMediaMapping) {
    this.showStyleDialog(result);
    // console.log(result);
    // result.styles = '{"font-family":"cursive","background":"green","border":"3px outset black", \r\n"font-style": "italic", "font-size" : "larger", "border-radius": "30px"}';
    // this.formatUrl();
  }

  uploadBackgroundImageFile() {
    this.syncTreeServicesService.uploadBackgroundImageFile(this.filedata, this.userid).subscribe((Response) => {
      console.log(Response);
      // this.userSocialMaps = Response;
      let objectURL = 'url(data:image/png;base64,' + Response[2].bioImage + ')';
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      //uncommented below line for dynamic background
      this.background = objectURL;
      // this.background = "linen";

    }),
      error => {
        console.log(error);
      }
  }
  backImageBio() {

  }

  toggleEditRegion(){
    this.showEditRegion = !this.showEditRegion;
  }

  updateSequenceAndSave(event) {
    let cntr = 0;
    if (event.currentIndex != event.previousIndex) {
      this.userSocialMaps.forEach((x) => {
        if(x.sequence == event.previousIndex){
          x.sequence = event.currentIndex;
        }
        else if(event.currentIndex > event.previousIndex && x.sequence <= event.currentIndex  && x.sequence > event.previousIndex){
          x.sequence = x.sequence-1;
        }
        else if(event.currentIndex < event.previousIndex && x.sequence < event.previousIndex  && x.sequence >= event.currentIndex){
          x.sequence = x.sequence+1;
        }
      }

      )
      
      this.userSocialMaps.forEach((x) => {
        cntr = cntr + 1;
        x.styleObject = null;
        x.logo = null;
        x.value = null;
        this.updateSequence(x, cntr);
      })
    }
    
  }

  editSocialMedia() {
    this.isEditMode = false;
  }

  cancelEditSocialMedia() {
    this.isEditMode = true;
  }

  socialMediaUpdate(result: userSocialMediaMapping) {
    delete result.styleObject;
    //this means logo image is already saved
    if( result && result.logo && result.logo.includes('data:image/png;base64')){
      result.logo = "";
    }
    this.syncTreeServicesService.userSocialMediaMappingUpdate(result).subscribe((Response) => {
      console.log(Response);
        this.userSocialMaps = Response.value;
      this.isEditMode = true;
      this.formatUrl();
    })
  }

  deleteSocialMedia(result: userSocialMediaMapping) {
    let localUserSocialMediaMapping : userSocialMediaMapping={
      id: result.id,
    socialMediaId: 0,
    socialMediaLink: '',
    userId: 0,
    type: '',
    value: '',
    logo: '',
    fileData: null,
    styles: '',
    styleObject: null,
    sequence: 0,
    title: '',
    formValues : ''
    }
    this.syncTreeServicesService.userSocialMediaMappingDelete(localUserSocialMediaMapping).subscribe((Response) => {
      console.log(Response);
      this.userSocialMaps = Response.value;
      this.isEditMode = true;
      this.formatUrl();
    })
  }
  getSocialMediaUserDetails(userId: number) {
    this.syncTreeServicesService.getSocialMediaUserDetails(userId).subscribe((Response) => {
      console.log(Response);
      this.userSocialMaps = Response;
      this.formatUrl();
    })
  }

  shareSocialMediaLinks() {
    this.openSocialLinksDialog();
  }

}


@Component({
  selector: 'sync-tree-data-dialog',
  templateUrl: 'sync-tree-data-dialog.html',
})
export class SyncTreeDataDialog {
  name: string = '';
  userSocialMaps: userSocialMediaMapping = {
    id: 0,
    socialMediaId: 0,
    socialMediaLink: '',
    userId: 0,
    type: '',
    value: '',
    logo: '',
    fileData: null,
    styles: '',
    styleObject: null,
    sequence: 0,
    title: '',
    formValues : ''
  };

  tagPerpleDetailsData: tagMediaDetails = {
    name: '',
    personMediaId: '',
    socialMediaId: '',
    verifyPersonUrl: ''
  };
  constructor(

    public dialogRef: MatDialogRef<SyncTreeDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  fileEvent(e) {
    this.userSocialMaps.fileData = e.target.files[0];
    // this.uploadFile();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick() {
    console.log(this.userSocialMaps);
    this.data = this.tagPerpleDetailsData;
    this.dialogRef.close(this.userSocialMaps);
  }
}

export enum EnSocialMedia {
  Facebook = 1,
  Instagram = 2,
  Youtube = 3,
  Twitter = 4,
  Threads = 5
}

@Component({
  selector: 'social-media-share-dialog',
  templateUrl: 'social-media-share-dialog.html',
})

export class SocialMediaShareLinks {
  name: string = '';
  userSocialMaps: userSocialMediaMapping = {
    id: 0,
    socialMediaId: 0,
    socialMediaLink: '',
    userId: 0,
    type: '',
    value: "",
    logo: '',
    fileData: null,
    styles: '',
    styleObject: null,
    sequence: 0,
    title: '',
    formValues : ''
  };
  tagPerpleDetailsData: tagMediaDetails = {
    name: '',
    personMediaId: '',
    socialMediaId: '',
    verifyPersonUrl: ''
  };
  constructor(

    public dialogRef: MatDialogRef<SyncTreeDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick() {
    console.log(this.userSocialMaps);
    this.data = this.tagPerpleDetailsData;
    this.dialogRef.close(this.userSocialMaps);
  }
}

export interface IDynamicFormData {
  title: string;
  fields: string;
}


@Component({
  selector: 'form-dialog',
  templateUrl: 'form-dialog.html',
})

export class formDialog {
  fieldArray: any[];
  dataset: any[] = [];
  @ViewChild('input', { static: false }) inputData: ElementRef;

  constructor(

    public dialogRef: MatDialogRef<SyncTreeDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicFormData) {
    this.fieldArray = data.fields.split(',');
  }
  updateDataset(field, event) {

    if (this.dataset && this.dataset.filter(x => x.includes(field + ':')).length == 0) {
      this.dataset.push(field + ':' + event.target.value);
    }
    else {
      this.dataset[this.dataset.findIndex(x => x.includes(field + ':'))] = field + ':' + event.target.value;
    }
  }
  onNoClick(): void {
    console.log(this.inputData);
    this.dialogRef.close(this.dataset);
  }
  onAddClick() {
    this.dialogRef.close(this.dataset);
  }

}


@Component({
  selector: 'add-image-dialog',
  templateUrl: 'add-image-dialog.html',
})

export class AddImageDialog {
  fieldArray: any[];
  dataset: any[] = [];
  filedata: File;
  @ViewChild('input', { static: false }) inputData: ElementRef;

  constructor(

    public dialogRef: MatDialogRef<AddImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    //  this.fieldArray = data.fields.split(',');
  }
  fileEvent(e) {
    this.filedata = e.target.files[0];
    // this.uploadFile();
  }
  onNoClick(): void {
    console.log(this.filedata);
    this.dialogRef.close();
  }
  onAddClick() {
    this.dialogRef.close(this.filedata);
  }

}


//style dialog


@Component({
  selector: 'style-dialog',
  templateUrl: 'style-dialog.html',
})

export class StyleDialog {
  keyValuePair: keyValuePair = {
    key: '',
    value: ''
  }
  @ViewChild('input', { static: false }) inputData: ElementRef;

  constructor(

    public dialogRef: MatDialogRef<StyleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    //  this.fieldArray = data.fields.split(',');
  }
  onSubmitReason = new EventEmitter();
  submitUserReason(event, type): void {
    console.log(event.target.value);
    this.keyValuePair.key = type;
    this.keyValuePair.value = event.target.value;
    this.onSubmitReason.emit(this.keyValuePair);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick() {
  }

}

export interface keyValuePair {
  key: string,
  value: string
}