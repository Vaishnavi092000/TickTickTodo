import { TestBed } from '@angular/core/testing';

import { FileuploadService } from '../fileUpload/fileupload.service';

describe('FileuploadService', () => {
  let service: FileuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
