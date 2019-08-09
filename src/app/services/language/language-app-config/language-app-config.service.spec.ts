import { TestBed } from '@angular/core/testing';
import { LanguageAppConfigModule } from './language-app-config.module';
import { LanguageAppConfigService } from './language-app-config.service';

describe('LanguageAppConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LanguageAppConfigModule,
    ]
  }));

  it('should be created', () => {
    const service: LanguageAppConfigService = TestBed.get(LanguageAppConfigService);
    expect(service).toBeTruthy();
  });

  it('should not reload app on server side rendering', () => {
    const service: any = TestBed.get(LanguageAppConfigService);
    service.isServer = true;
    const spy = spyOn(service.appModuleRef, 'destroy').and.callThrough();
    service.reloadMainApp();
    expect(spy).not.toHaveBeenCalled();
  });
});
