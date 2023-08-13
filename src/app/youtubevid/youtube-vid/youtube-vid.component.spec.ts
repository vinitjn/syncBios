import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVidComponent } from './youtube-vid.component';

describe('YoutubeVidComponent', () => {
  let component: YoutubeVidComponent;
  let fixture: ComponentFixture<YoutubeVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
