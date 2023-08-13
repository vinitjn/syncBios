import { TestBed } from '@angular/core/testing';

import { SyncTreeServicesService } from './sync-tree-services.service';

describe('SyncTreeServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncTreeServicesService = TestBed.get(SyncTreeServicesService);
    expect(service).toBeTruthy();
  });
});
