import { TestBed } from '@angular/core/testing';

import { ImagenesServiceService } from './imagenes-service.service';

describe('ImagenesServiceService', () => {
  let service: ImagenesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
