import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppWarpperContentModule } from '../app-warpper-content/app-warpper-content.module';
import { NavbarTestingModule } from '../navbar/testing/navbar-testing.module';
import { AppWrapperNonAuthComponent } from './app-wrapper-non-auth.component';


describe('AppWrapperNonAuthComponent', () => {
  let component: AppWrapperNonAuthComponent;
  let fixture: ComponentFixture<AppWrapperNonAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppWrapperNonAuthComponent ],
      imports: [
        RouterTestingModule,
        NavbarTestingModule,
        TranslateModule.forRoot(),
        AppWarpperContentModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWrapperNonAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
