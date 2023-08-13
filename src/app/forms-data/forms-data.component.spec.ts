import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDataComponent } from './forms-data.component';

describe('FormsDataComponent', () => {
  let component: FormsDataComponent;
  let fixture: ComponentFixture<FormsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
