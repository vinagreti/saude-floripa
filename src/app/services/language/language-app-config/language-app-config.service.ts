import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, NgModuleRef, PLATFORM_ID } from '@angular/core';
import { I18nLocale } from '@models/language';
import { AppModule } from 'src/app/app.module';
import { getAppGenericaLanguage } from './../functions';

@Injectable()
export class LanguageAppConfigService {

  private isServer: boolean;

  constructor(
    private appModuleRef: NgModuleRef<AppModule>,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.detectEnv();
  }

  setBaseHrefLanguage(language: I18nLocale) {
    if (this.baseHrefLanguage) {
      this.replaceBaseHrefLanguage(language);
    } else {
      this.setInitialBaseHrefLanguage(language);
    }
    this.setHtmlLanguage(language);
    setTimeout(() => this.reloadMainApp(), 0);
  }

  reloadMainApp() {
    if (!this.isServer) {
      try {
        this.appModuleRef.destroy();
        const reloadEvent = new Event('DOMContentLoaded');
        document.dispatchEvent(reloadEvent);
      } catch { }
    }
  }

  get baseHrefLanguage() {
    const pathSlices = this.baseHref.split('/').filter(slice => !!slice);
    const baseHrefLanguage = (pathSlices[pathSlices.length - 1]) as I18nLocale;
    const languageInBaseHref = getAppGenericaLanguage(baseHrefLanguage);
    return languageInBaseHref;
  }

  private detectEnv() {
    this.isServer = isPlatformServer(this.platformId);
  }

  private setHtmlLanguage(language) {
    this.document.getElementsByTagName('html')[0].setAttribute('lang', language);
  }

  private setInitialBaseHrefLanguage(language) {
    this.baseTag.setAttribute('href', `/${language}`);
  }

  private replaceBaseHrefLanguage(language) {
    const newBaseHref = this.baseHref.replace(this.baseHrefLanguage, language);
    this.baseTag.setAttribute('href', newBaseHref);
  }

  private get baseTag() {
    return this.document.getElementsByTagName('base')[0];
  }

  private get baseHref() {
    return this.baseTag.getAttribute('href');
  }

}
