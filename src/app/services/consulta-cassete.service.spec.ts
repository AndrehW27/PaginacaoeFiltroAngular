import { TestBed } from '@angular/core/testing';

import { ConsultaCasseteService } from './consulta-cassete.service';

describe('ConsultaCasseteService', () => {
  let service: ConsultaCasseteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaCasseteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
