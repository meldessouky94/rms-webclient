import { TestBed } from '@angular/core/testing';

import { ResourceService } from './resource.service';
import { HttpClientModule } from '@angular/common/http';

describe('ResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
       imports: [
         HttpClientModule
       ]
  }));

  it('should be created', () => {
    const service: ResourceService = TestBed.get(ResourceService);
    expect(service).toBeTruthy();
  });
});
