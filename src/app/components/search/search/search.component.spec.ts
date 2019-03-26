import { SearchComponent } from "./search.component";

describe('SearchComponent', () => {
  let component: SearchComponent;

  let routerStub: {};

  beforeEach(() => {
    routerStub = {}
  });

  it('should create', () => {
    component = new SearchComponent(<any>routerStub);
    expect(component).toBeTruthy();
  })
});
