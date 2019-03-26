import { ResourceService } from './resource.service';
import { SearchDto } from 'src/app/models/search-dto';
import { Resource } from 'src/app/models/resource';
import { Observable, Subscription } from 'rxjs';

describe('ResourceService', () => {
  let httpClientSpy: { get: jasmine.Spy }
  let resourceService: ResourceService
  let testSub: Subscription

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
      testSub = resourceService.$currentResourceList.subscribe(resourceList => {
        expect(resourceList).toBe(dummyResource);
        done();
      });
      resourceService.pushNewCurrentResourceList(dummyResource);
      expect(resourceService.currentResourceList).toBe(dummyResource)
    });

    it('Should push a false array to the current resource list unsuccessfully', (done: DoneFn) => {
      testSub = resourceService.$currentResourceList.subscribe((u) => {
        expect(u).toBeFalsy();
        done();
      });
      resourceService.pushNewCurrentResourceList(undefined);
      expect(resourceService.currentResourceList).toBeFalsy();
    });
  });

  describe('getCampuses', () => {
    it('Should send a get request and return an observable', () => {
      httpClientSpy.get.and.returnValue(new Observable<any>());
      testSub = resourceService.getCampuses().subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getResourceById', () => {
    it('#getResourceById should send a get request with the resource id', () => {
      const targetId = 1;
      httpClientSpy.get.and.returnValue(new Observable<Resource>());
      testSub = resourceService.getResourceById(targetId).subscribe();
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
      testSub = resourceService.getAvailableResources(dummySearch).subscribe();
      expect(httpClientSpy.get.calls.count()).toBe(1);
    })
  })

  afterAll(() => {
    if (testSub) testSub.unsubscribe();
  })
});

