import { TestBed } from '@angular/core/testing';

import { StorageAcessService } from './storage-acess.service';

describe('StorageAcessService', () => {
  let service: StorageAcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
