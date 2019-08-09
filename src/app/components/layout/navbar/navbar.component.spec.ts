import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nLocale } from '@models/language';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { NavbarTestingModule } from './testing/navbar-testing.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent.trim()).toEqual('app.title');
  });

  it('should set language to PT', (done) => {
    component.setLanguage(I18nLocale.PT).subscribe(() => {
      component.language$
      .subscribe(language => {
        expect(language).toEqual(I18nLocale.PT);
        done();
      });
    });
  });

  it('should set language to EN', (done) => {
    component.setLanguage(I18nLocale.EN).subscribe(() => {
      component.language$
      .subscribe(language => {
        expect(language).toEqual(I18nLocale.EN);
        done();
      });
    });
  });

  it('should render the change language buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.language$ = new BehaviorSubject(I18nLocale.PT);
    fixture.detectChanges();
    expect(compiled.querySelector('button')).toBeTruthy();
  });
});
