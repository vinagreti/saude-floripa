import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './language.module';
import { LanguageService } from './language.service';
import { LanguageServiceTestingModule } from './testing';

describe('LanguageService', () => {

  const defaultLanguage = environment.defaultLanguage;
  const extraLanguage = environment.extraLanguages[0];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LanguageServiceTestingModule,
      HttpClientTestingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
      }),
    ]
  }));

  it('should be created', () => {
    // given
    const service: LanguageService = TestBed.get(LanguageService);
    // then
    expect(service).toBeTruthy();
  });

  it('should get language', (done) => {
    // given
    const service: LanguageService = TestBed.get(LanguageService);
    // when
    service.language$.subscribe(language => {
      // then
      expect(language).toBeTruthy();
      done();
    })
  });

  it('should set language', (done) => {
    // given
    const service: LanguageService = TestBed.get(LanguageService);
    // when
    const changeRespose = service.setLanguage(extraLanguage);
    // then
    changeRespose.subscribe(() => {
      const language = service.language;
      expect(language).toEqual(extraLanguage);
      done();
    });
  });

  it('should set language in url when setLanguage is called', (done) => {
    // given
    const service: any = TestBed.get(LanguageService);
    // when
    const navigated = spyOn(service, 'replaceLanguageInUrl').and.callThrough();

    service.setStoreLanguage(defaultLanguage).subscribe(() => {
      service.setLanguage(extraLanguage);
      // then
      expect(navigated).toHaveBeenCalled();
      done();
    });
  });

  it('should not set language in url when setLanguage is called with same language', (done) => {
    // given
    const service: any = TestBed.get(LanguageService);
    // when
    const navigated = spyOn(service, 'replaceLanguageInUrl').and.callThrough();
    service.setStoreLanguage(defaultLanguage).subscribe(() => {
      service.setLanguage(extraLanguage);
      service.setLanguage(extraLanguage);
      // then
      expect(navigated).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should set language in url when setLanguage is called different same language', (done) => {
    // given
    const service: any = TestBed.get(LanguageService);
    // when
    const navigated = spyOn(service, 'replaceLanguageInUrl').and.callThrough();
    service.setStoreLanguage(defaultLanguage).subscribe(() => {
      service.setLanguage(extraLanguage);
      service.setLanguage(defaultLanguage);
      // then
      expect(navigated).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should change location.href as a fallback to missed window.history.pushState', () => {
    // given
    const service: any = TestBed.get(LanguageService);
    // when
    spyOn(service, 'pushHistoryState').and.throwError('');
    const ieFallback = spyOn(service, 'changeLocationHref').and.stub();
    service.replaceUrl('');
    // then
    expect(ieFallback).toHaveBeenCalled();
  });

  it('should change location.href as a fallback to missed window.history.pushState', () => {
    // given
    const service: any = TestBed.get(LanguageService);
    service.windowLocation = {assign: () => {}};
    // when
    spyOn(service, 'pushHistoryState').and.throwError('');
    const ieFallback = spyOn(service, 'changeLocationHref').and.callThrough();
    service.replaceUrl('');
    // then
    expect(ieFallback).toHaveBeenCalled();
  });

});
