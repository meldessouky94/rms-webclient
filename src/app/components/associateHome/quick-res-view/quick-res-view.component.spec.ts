import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickResViewComponent } from './quick-res-view.component';

describe('QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickResViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickResViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
