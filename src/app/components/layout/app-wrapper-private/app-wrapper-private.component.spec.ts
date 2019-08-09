import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth';
import { AppWarpperContentModule } from '../app-warpper-content/app-warpper-content.module';
import { NavbarTestingModule } from '../navbar/testing/navbar-testing.module';
import { AppWrapperPrivateComponent } from './app-wrapper-private.component';


describe('AppWrapperPrivateComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AppWrapperPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppWrapperPrivateComponent ],
      imports: [
        RouterTestingModule,
        NavbarTestingModule,
        TranslateModule.forRoot(),
        AppWarpperContentModule,
        MatMenuModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWrapperPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', (done) => {
    // given component
    component.logout();
    // when
    (component.authService as AuthService).logged$.subscribe(logged => {
      // then
      expect(logged).toBeFalsy();
      done();
    });
  });
});
