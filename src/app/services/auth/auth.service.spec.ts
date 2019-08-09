import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthServiceTestingModule } from './testing/auth-service-testing.module';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AuthServiceTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
