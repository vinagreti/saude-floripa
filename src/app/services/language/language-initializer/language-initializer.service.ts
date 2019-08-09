import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { I18nLocale } from '@models/language';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { getAppGenericaLanguage, getBrowserLocale } from '../functions';
import { LanguageAppConfigService } from '../language-app-config/language-app-config.service';
import { ASetLanguage } from '../language.actions';
import { LanguageState } from '../language.state';


@Injectable()
export class LanguageInitializerService {

  private appConfig = environment;

  private browserLocale = getBrowserLocale();

  constructor(
    private location: Location,
    private store: Store,
    private translate: TranslateService,
    private languageAppConfigService: LanguageAppConfigService,
  ) { }

  initLanguageService() {
    this.detectFlowAntInitialize();
  }

  private detectFlowAntInitialize() {
    const baseHrefLanguage = this.languageAppConfigService.baseHrefLanguage;
    if (baseHrefLanguage) {
      this.runBaseHrefConfigurationFlow(baseHrefLanguage);
    } else {
      const urlLanguage = this.getGenericLanguageFromUrl();
      if (urlLanguage) {
        this.runUrlConfigurationFlow(urlLanguage);
      } else {
        const storeLanguage = this.getGenericStoredLanguage();
        if (storeLanguage) {
          this.runStoreConfigurationFlow(storeLanguage);
        } else {
          const browsersLanguage = this.getBrowsersGenericLanguage();
          if (browsersLanguage) {
            this.runBrowserConfigurationFlow(browsersLanguage);
          } else {
            this.runDefaultConfigurationFlow();
          }
        }
      }
    }
  }

  private getStoredLanguage() {
    return this.store.selectSnapshot(LanguageState.language);
  }

  private getGenericLanguageFromUrl() {
    const pathSlices = this.location.path().split('/').filter(slice => !!slice);
    const languageInUrl = getAppGenericaLanguage(pathSlices[0] as I18nLocale);
    return languageInUrl;
  }

  private getGenericStoredLanguage() {
    const storeLanguage = this.getStoredLanguage();
    return getAppGenericaLanguage(storeLanguage);
  }

  private getBrowsersGenericLanguage() {
    return getAppGenericaLanguage(this.browserLocale);
  }

  private runBaseHrefConfigurationFlow(language: I18nLocale) {
    this.setStoreLanguage(language);
    this.setTranslateServiceLanguage(language);
  }

  private runUrlConfigurationFlow(language: I18nLocale) {
    this.setStoreLanguage(language);
    this.setTranslateServiceLanguage(language);
    this.languageAppConfigService.setBaseHrefLanguage(language);
  }

  private runStoreConfigurationFlow(language: I18nLocale) {
    this.setTranslateServiceLanguage(language);
    this.languageAppConfigService.setBaseHrefLanguage(language);
  }

  private runBrowserConfigurationFlow(language: I18nLocale) {
    this.setStoreLanguage(language);
    this.setTranslateServiceLanguage(language);
    this.languageAppConfigService.setBaseHrefLanguage(language);
  }

  private runDefaultConfigurationFlow() {
    const language = this.appConfig.defaultLanguage;
    this.setStoreLanguage(language);
    this.setTranslateServiceLanguage(language);
    this.languageAppConfigService.setBaseHrefLanguage(language);
  }

  private setStoreLanguage(language: I18nLocale) {
    return this.store.dispatch(new ASetLanguage(language));
  }

  private setTranslateServiceLanguage(language: I18nLocale) {
    this.translate.use(language);
  }

}
