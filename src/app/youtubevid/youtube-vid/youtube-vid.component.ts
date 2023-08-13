import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-vid',
  templateUrl: './youtube-vid.component.html',
  styleUrls: ['./youtube-vid.component.css']
})
export class YoutubeVidComponent implements OnInit {
  @Input() id: string;
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit() {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.id);
  }

}
