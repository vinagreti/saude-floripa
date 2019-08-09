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

    it(`should not get generic stored language if doesn't exists`, (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      spyOn(service, 'initLanguageService').and.callFake(() => {}).and.callThrough();
      // then
      service.setStoreLanguage(undefined).subscribe(() => {
        const srtoredLanguage = service.getGenericStoredLanguage();
        expect(srtoredLanguage).toBeUndefined();
        done();
      });
    });

    it(`should not get generic stored language if invalid`, (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      spyOn(service, 'initLanguageService').and.callFake(() => {}).and.callThrough();
      // then
      service.setStoreLanguage('invalidone').subscribe(() => {
        const srtoredLanguage = service.getGenericStoredLanguage();
        expect(srtoredLanguage).toBeUndefined();
        done();
      });
    });

    it(`should get generic stored language if exists and is valid`, (done) => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      spyOn(service, 'initLanguageService').and.callFake(() => {}).and.callThrough();
      // then
      service.setStoreLanguage(extraLanguage).subscribe(() => {
        const srtoredLanguage = service.getGenericStoredLanguage();
        expect(srtoredLanguage).toEqual(extraLanguage);
        done();
      });
    });

  });

  describe('Url flow', () => {

    it('should get language from url if valid', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      service.location = {path: () => `/${extraLanguage}`};
      service.initLanguageService();
      // then
      const language = service.getStoredLanguage();
      expect(language).toEqual(extraLanguage);
    });

    it('should not get language from url if undefined', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      const methodSpy = spyOn(service, 'runUrlConfiguratinoFlow').and.callThrough();
      service.initLanguageService();
      // then
      expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should not get language from url if not valid', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      service.location = {path: () => `/asdasdasd`};
      const methodSpy = spyOn(service, 'runUrlConfiguratinoFlow').and.callThrough();
      service.initLanguageService();
      // then
      expect(methodSpy).not.toHaveBeenCalled();
    });

  });

  describe('Default flow', () => {

    it('should run browser configuration flow', () => {
      // given
      const service: any = TestBed.get(LanguageInitializerService);
      // when
      service.browserLocale = undefined;
      const methodSpy = spyOn(service, 'runDefaultConfiguratinoFlow').and.callThrough();
      service.initLanguageService();
      // then
      expect(methodSpy).toHaveBeenCalled();
    });

  });
});
