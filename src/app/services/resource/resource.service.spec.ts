import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

import { ResourceService } from './resource.service';
import { async } from 'q';



describe('ResourceService', () => {
  let service: ResourceService
  let httpMock : HttpTestingController


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceService]
    });
    service = TestBed.get(ResourceService)
    httpMock = TestBed.get(HttpTestingController)

  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('should retrieve campuses from the API via GET', () => {
    const dummyCampuses: any[] = [ {
      id: 1,
      name: 'USF',
      buildings: [{id: 1, name: 'Building 1', campus_id: 1}, {id: 2, name: 'Building 2', campus_id: 1} ]
    }, {
      id: 2,
      name: 'MoCo',
      buildings: [{id: 3, name: 'Building 5', campus_id: 2}, {id: 4, name: 'Building 6', campus_id: 2} ]
    }];
    service.getCampuses().subscribe(campuses => {
      expect(campuses.length).toBe(2);
      expect(campuses).toEqual(dummyCampuses);
    });

    const request = httpMock.expectOne(`${service.apiUrl}${environment.serviceContext.resource}/campuses`);
    expect(request.request.method).toBe('GET');

    request.flush(dummyCampuses);
  });
  it('should be created', () => {
    const service: ResourceService = TestBed.get(ResourceService);
    expect(service).toBeTruthy();
  });
});
