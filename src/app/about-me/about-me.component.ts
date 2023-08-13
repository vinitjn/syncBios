import { Component, OnInit } from '@angular/core';
import { Idomain } from '../models/domain';
import { SyncTreeServicesService } from '../Services/sync-tree-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  readonly userId = 1;
  selectedDomain : string = '';
  domainDetails : Idomain[] = [
    { id : 0,isSelected : false,name : 'Animals' },
    { id : 1,isSelected : false,name : 'Anime' },
    { id : 2,isSelected : false,name : 'Art' },
    { id : 3,isSelected : false,name : 'Beauty' },
    { id : 4,isSelected : false,name : 'books Writing' },
    { id : 5,isSelected : false,name : 'Business' },
    { id : 6,isSelected : false,name : 'Dance' },
    { id : 7,isSelected : false,name : 'Design' },
    { id : 8,isSelected : false,name : 'Education' },
    { id : 9,isSelected : false,name : 'Fashion' },
    { id : 10,isSelected : false,name : 'Entertainment' },
    { id : 11,isSelected : false,name : 'Food' },
    { id : 12,isSelected : false,name : 'Animals' },
    { id : 13,isSelected : false,name : 'Anime' },
    { id : 14,isSelected : false,name : 'Art' },
    { id : 15,isSelected : false,name : 'Beauty' },
    { id : 16,isSelected : false,name : 'books Writing' },
    { id : 17,isSelected : false,name : 'Business' },
    { id : 18,isSelected : false,name : 'Dance' },
    { id : 19,isSelected : false,name : 'Design' },
    { id : 20,isSelected : false,name : 'Education' },
    { id : 21,isSelected : false,name : 'Fashion' },
    { id : 22,isSelected : false,name : 'Entertainment' },
    { id : 23,isSelected : false,name : 'Food' },
    { id : 24,isSelected : false,name : 'Animals' },
    { id : 25,isSelected : false,name : 'Anime' },
    { id : 26,isSelected : false,name : 'Art' },
    { id : 27,isSelected : false,name : 'Beauty' },
    { id : 28,isSelected : false,name : 'books Writing' },
    { id : 29,isSelected : false,name : 'Business' },
    { id : 30,isSelected : false,name : 'Dance' },
    { id : 31,isSelected : false,name : 'Design' },
    { id : 32,isSelected : false,name : 'Education' },
    { id : 33,isSelected : false,name : 'Fashion' },
    { id : 34,isSelected : false,name : 'Entertainment' },
    { id : 35,isSelected : false,name : 'Food' }
  ]
  
  constructor(public syncTreeServicesService: SyncTreeServicesService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  saveDomain(){
    this.domainDetails.forEach( x => {
      if(x.isSelected)
      this.selectedDomain = this.selectedDomain + x.id + ',';
    }

    )
    this.syncTreeServicesService.updateUserAboutme(this.userId, '', this.selectedDomain ).subscribe(response => {
      if(response && response.value) {
        alert('value saves successfully!;');
      }
      this.selectedDomain = response.value.domain;
      let selectedDomainList = response.value.domain.split(',');
      selectedDomainList.forEach(element => {
        if(element != ''){
          this.domainDetails.filter(x => x.id == element)[0].isSelected = true;
        }
      });
      this.router.navigate(['/synctrees/' + response.value.userName]);
    })
  }

  getUsers(){
    this.syncTreeServicesService.getUsers(this.userId).subscribe( response => {
      this.selectedDomain = response.domain;
      let selectedDomainList = response.domain.split(',');
      selectedDomainList.forEach(element => {
        if(element != ''){
          this.domainDetails.filter(x => x.id == element)[0].isSelected = true;
        }
      });
    })
  }

  selectDomain(domain : Idomain){
    domain.isSelected = !domain.isSelected;
  }
}
