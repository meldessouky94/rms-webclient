import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateHomeComponent } from './associate-home.component';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { QuickResViewComponent } from '../quick-res-view/quick-res-view.component';
import { ResourceFormComponent } from '../../shared/resource-form/resource-form.component';
import { HttpClientModule } from '@angular/common/http';


describe('AssociateHomeComponent', () => {
  let component: AssociateHomeComponent;
  let fixture: ComponentFixture<AssociateHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssociateHomeComponent,
        QuickResViewComponent,
        ResourceFormComponent
       ],
       imports: [
         HttpClientModule
       ]
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

  it('should contain QuickResView component', async() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toContain(QuickResViewComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
