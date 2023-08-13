import { Component, OnInit } from '@angular/core';
import { users } from '../models/user';
import { SyncTreeServicesService } from '../Services/sync-tree-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userId = 1;
  user : users={
    email : '',
    firstName : '',
    id : 1,
    lastName : '',
    mobileNumber : '',
    password : '',
    userName : '',
    Aboutme : '',
    backgroundImage : '',
    Domain : '',
    profilePic : ''
  };
  constructor(public syncTreeServicesService : SyncTreeServicesService,
    private router: Router) { }

  ngOnInit() {
  }

  signUp(){
    this.syncTreeServicesService.signUpUser(this.user).subscribe((Response) => {
      console.log(Response);
      this.initialization();
      alert('User Registered Successfully! Please Login in to continue.');
    })
  }
  
 

  login(){
    this.syncTreeServicesService.validateUser(this.user).subscribe((Response : users[]) => {
      if(Response.length > 0){
        this.initialization();
        this.router.navigate(['/synctrees/'+Response[0].userName]);
      }
      else{
        alert('invalid credentials');
      }

    })
  }

  initialization(){
    this.user.email = '';
    this.user.password = '';
    this.user.mobileNumber = '';
    this.user.mobileNumber = '';
    this.user.userName = '';
  }

}
