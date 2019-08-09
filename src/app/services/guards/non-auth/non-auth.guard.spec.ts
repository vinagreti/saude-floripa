import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingBlankComponent, TestingBlankComponentModule } from '@testing/components';
import { BehaviorSubject } from 'rxjs';
import { NonAuthGuard } from './non-auth.guard';


describe('NonAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingBlankComponentModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestingBlankComponent }
        ]),
      ],
      providers: [NonAuthGuard],
    });
  });

  it('should run canActivate as logged', inject([NonAuthGuard], (guard: NonAuthGuard) => {
    const innerGuard: any = guard;
    const spy = spyOn(innerGuard.router, 'createUrlTree').and.callThrough();
    innerGuard.authService.logged$ = new BehaviorSubject(true);
    innerGuard.canActivate(null, null).subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('should run canActivateChild as logged', inject([NonAuthGuard], (guard: NonAuthGuard) => {
    const innerGuard: any = guard;
    const spy = spyOn(innerGuard.router, 'createUrlTree').and.callThrough();
    innerGuard.authService.logged$ = new BehaviorSubject(true);
    innerGuard.canActivateChild(null, null).subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('should not activate and return fallback in canActivate', inject([NonAuthGuard], (guard: NonAuthGuard) => {
    const innerGuard: any = guard;
    const spy = spyOn(innerGuard.router, 'createUrlTree').and.callThrough();
    innerGuard.authService.logged$ = new BehaviorSubject(false);
    innerGuard.canActivate(null, null).subscribe();
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should not activate and return fallback in canActivateChild', inject([NonAuthGuard], (guard: NonAuthGuard) => {
    const innerGuard: any = guard;
    const spy = spyOn(innerGuard.router, 'createUrlTree').and.callThrough();
    innerGuard.authService.logged$ = new BehaviorSubject(false);
    innerGuard.canActivateChild(null, null).subscribe();
    expect(spy).not.toHaveBeenCalled();
  }));
});
