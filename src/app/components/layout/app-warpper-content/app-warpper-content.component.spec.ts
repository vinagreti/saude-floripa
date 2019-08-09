import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWarpperContentComponent } from './app-warpper-content.component';


describe('AppWarpperContentComponent', () => {
  let component: AppWarpperContentComponent;
  let fixture: ComponentFixture<AppWarpperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppWarpperContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWarpperContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
