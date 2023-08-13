import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncTreeDataComponent } from './sync-tree-data.component';

describe('SyncTreeDataComponent', () => {
  let component: SyncTreeDataComponent;
  let fixture: ComponentFixture<SyncTreeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncTreeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncTreeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
