import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickResViewComponent } from './quick-res-view.component';
import { HttpClientModule } from '@angular/common/http';

describe('QuickResViewComponent', () => {
  let component: QuickResViewComponent;
  let fixture: ComponentFixture<QuickResViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickResViewComponent
       ],
       imports: [
         HttpClientModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(QuickResViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('', async() => {

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
