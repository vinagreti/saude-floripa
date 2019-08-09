import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth';
import { AuthServiceTestingModule } from '@services/auth/testing';
import { LoginPageComponent } from './login-page.component';


describe('LoginPageComponent', () => {
  let component: any;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [
        TranslateModule.forRoot(),
        AuthServiceTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', (done) => {
    // given component
    component.login();
    // when
    (component.authService as AuthService).logged$.subscribe(logged => {
      // then
      expect(logged).toBeTruthy();
      done();
    });
  });
});
