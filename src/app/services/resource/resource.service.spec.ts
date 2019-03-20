import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

import { ResourceService } from './resource.service';
import { async } from 'q';
import { SearchDto } from 'src/app/models/search-dto';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Resource } from 'src/app/models/resource';
import { Observable } from 'rxjs';
import { resource } from 'selenium-webdriver/http';



describe('ResourceService', () => {
  let httpClientSpy: { get: jasmine.Spy }
  let resourceService: ResourceService

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    resourceService = new ResourceService(<any>httpClientSpy)
  });

  it('should be created ', () => {
    expect(resourceService).toBeTruthy();
  })

  describe('pushNewCurrentResourceList', () => {
    it('Should push an array of resources to the current resource list', (done: DoneFn) => {
      const dummyResource: Resource[] = [new Resource()];
      resourceService.$currentResourceList.subscribe(resourceList => {
        expect(resourceList).toBe(dummyResource);
        done();
      });
      resourceService.pushNewCurrentResourceList(dummyResource);
      expect(resourceService.currentResourceList).toBe(dummyResource)
    });
    it('Should push a false array to the current resource list unsuccessfully', (done: DoneFn) => {
      const testSub = resourceService.$currentResourceList.subscribe((u) => {
        expect(u).toBeFalsy();
        testSub.unsubscribe();
        done();
      });
      resourceService.pushNewCurrentResourceList(undefined);
      expect(resourceService.currentResourceList).toBeFalsy();
    });
  });

  describe('getCampuses', () => {
    it('Should send a get request and return an observable', () => {
      httpClientSpy.get.and.returnValue(new Observable<any>());
      resourceService.getCampuses().subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getResourceById', () => {
    it('#getResourceById should send a get request with the resource id', () => {
      const targetId = 1;
      httpClientSpy.get.and.returnValue(new Observable<Resource>());
      resourceService.getResourceById(targetId).subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getAvailableResources', () => {
    it('Should send a get request with the searchDTO', () => {
      const dummySearch: SearchDto = {
        buildingId: 1,
        startTime: '1',
        endTime: '2',
        purpose: 'study',
        campusId: 1,
        reminderTime: 30
      };
  
      httpClientSpy.get.and.returnValue(new Observable<Resource[]>());
      resourceService.getAvailableResources(dummySearch).subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    })
  })
});

