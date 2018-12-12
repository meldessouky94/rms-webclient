import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateComponent } from './confirm-create.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmCreateComponent', () => {
  let component: ConfirmCreateComponent;
  let fixture: ComponentFixture<ConfirmCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ NgbActiveModal ],
      declarations: [ ConfirmCreateComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
