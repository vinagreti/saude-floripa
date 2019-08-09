import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageInitializerService } from './language-initializer.service';
import { LanguageInitializerServiceTestingModule } from './testing/language-initializer-testing.module';

describe('LanguageInitializerService', () => {

  const extraLanguage = environment.extraLanguages[0];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LanguageInitializerServiceTestingModule,
      HttpClientTestingModule,
      TranslateModule.forRoot(),
      RouterTestingModule,
    ]
  }));

  describe('Unit tests', () => {

    it('should be created', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // then
      expect(service).toBeTruthy();
    });

  });

  describe('Url flow', () => {

    it('should run url configuration flow', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      const methodSpy = spyOn(service, 'runUrlConfigurationFlow').and.callThrough();
      service.location = {path: () => `/${extraLanguage}`};
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      service.initLanguageService();
      // then
      expect(methodSpy).toHaveBeenCalled();
    });

  });

  describe('Store flow', () => {

    it('should run store configuration flow', (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      const methodSpy = spyOn(service, 'runStoreConfigurationFlow').and.callThrough();
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      // then
      service.setStoreLanguage(extraLanguage).subscribe(() => {
        service.initLanguageService();
        expect(methodSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should not run store configuration flow', (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      const methodSpy = spyOn(service, 'runStoreConfigurationFlow').and.callThrough();
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      // then
      service.setStoreLanguage(undefined).subscribe(() => {
        service.initLanguageService();
        expect(methodSpy).not.toHaveBeenCalled();
        done();
      });
    });

  });

  describe('Browser flow', () => {

    it('should run browser configuration flow', (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      const methodSpy = spyOn(service, 'runBrowserConfigurationFlow').and.callThrough();
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      // then
      service.setStoreLanguage(undefined).subscribe(() => {
        service.initLanguageService();
        expect(methodSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should not load browser locale if navigator is undefined', (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      spyOn(service, 'getBrowsersGenericLanguage').and.returnValue(undefined);
      const methodSpy = spyOn(service, 'runBrowserConfigurationFlow').and.callThrough();
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      // then
      service.setStoreLanguage(undefined).subscribe(() => {
        service.initLanguageService();
        expect(methodSpy).not.toHaveBeenCalled();
        done();
      });
    });

  });

  describe('Default flow', () => {
    it('should run default configuration flow', (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      spyOn(service, 'getBrowsersGenericLanguage').and.returnValue(undefined);
      service.languageAppConfigService.setInitialBaseHrefLanguage(undefined);
      const methodSpy = spyOn(service, 'runDefaultConfigurationFlow').and.callThrough();
      // then
      service.setStoreLanguage(undefined).subscribe(() => {
        service.initLanguageService();
        expect(methodSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
