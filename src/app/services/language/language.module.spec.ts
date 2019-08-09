import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, LanguageModule } from './language.module';
import { LanguageService } from './language.service';
import { LanguageServiceTestingModule } from './testing';


describe('LanguageModule', () => {

  it('should load the module', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [
          LanguageServiceTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
          }),
          HttpClientModule,
        ]
      });
    }).not.toThrow();
  });

  it('should not to throw an error if we instantiate the module once', () => {
    expect(() => {
      const instance1 = new LanguageModule({} as LanguageService, undefined);
    }).not.toThrow();
  });

  it('should throw an error if we instantiate the module more than once', () => {
    expect(() => {
      const instance1 = new LanguageModule({} as LanguageService, undefined);
      const instance2 = new LanguageModule({} as LanguageService, instance1);
    }).toThrow();
  });
});
