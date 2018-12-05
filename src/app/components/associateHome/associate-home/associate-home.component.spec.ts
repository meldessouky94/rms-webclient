import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateHomeComponent } from './associate-home.component';

describe('AssociateHomeComponent', () => {
  let component: AssociateHomeComponent;
  let fixture: ComponentFixture<AssociateHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
