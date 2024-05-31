import { TestBed } from '@angular/core/testing';
import { OpenmeteoService } from './openmeteo.service';


describe('OpenmeteoService', () => {
  let service: OpenmeteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenmeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
