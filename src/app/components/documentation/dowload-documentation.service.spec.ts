import { TestBed } from '@angular/core/testing';

import { DowloadDocumentationService } from './dowload-documentation.service';

describe('DowloadDocumentationService', () => {
  let service: DowloadDocumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowloadDocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
