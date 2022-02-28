import { TestBed } from '@angular/core/testing';

import { ServerService} from './server-interface.service';

describe('ServerInterfaceService', () => {
  let service: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
