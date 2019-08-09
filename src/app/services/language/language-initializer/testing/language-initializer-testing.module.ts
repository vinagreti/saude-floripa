import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { importAppEnabledLanguagesLocales } from '@services/language/functions';
import { LanguageAppConfigServiceTestingModule } from '@services/language/language-app-config/testing';
import { LanguageState } from '@services/language/language.state';
import { appTestingNoopMethod } from '@testing/functions';
import { NotFoundPageModule } from 'src/app/pages/static/not-found-page/not-found-page.module';
import { LanguageInitializerModule } from '../language-initializer.module';

const pathMock = {path: appTestingNoopMethod};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LanguageInitializerModule,
    LanguageAppConfigServiceTestingModule,
    NotFoundPageModule,
    TranslateModule.forRoot(),
    NgxsModule.forRoot([LanguageState]),
  ],
  exports: [
    LanguageAppConfigServiceTestingModule,
  ],
  providers: [
    { provide: Location, useValue: pathMock }
  ]
})
export class LanguageInitializerServiceTestingModule {
  constructor() {
    importAppEnabledLanguagesLocales();
  }
}
