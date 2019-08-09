import { Injectable } from '@angular/core';
import { I18nLocale } from '@models/language';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { LanguageAppConfigService } from './language-app-config/language-app-config.service';
import { LanguageInitializerService } from './language-initializer/language-initializer.service';
import { ASetLanguage } from './language.actions';
import { LanguageState } from './language.state';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  @Select(LanguageState.language) language$: Observable<I18nLocale>;

  private windowLocation = window.location; // helps testing (we cannot override window.location directly)

  constructor(
    private languageInitializer: LanguageInitializerService,
    private store: Store,
    private languageAppConfigService: LanguageAppConfigService,
  ) {
    this.languageInitializer.initLanguageService();
  }

  get language() {
    return this.getStoredLanguage();
  }

  setLanguage(language: I18nLocale) {
    if (language !== this.language) {
      this.setNewLanguageInUrl(language);
      return this.setStoreLanguage(language);
    } else {
      return this.returnStoreObservable();
    }
  }

  private returnStoreObservable() {
    const storeState = this.getStoredLanguage();
    return of(storeState);
  }

  private setNewLanguageInUrl(language: I18nLocale) {
    this.replaceLanguageInUrl(language);
    this.languageAppConfigService.setBaseHrefLanguage(language);
  }

  private setStoreLanguage(language: I18nLocale) {
    return this.store.dispatch(new ASetLanguage(language));
  }

  private getStoredLanguage() {
    return this.store.selectSnapshot(LanguageState.language);
  }

  private replaceLanguageInUrl(language: I18nLocale) {
    const currentPath = `${location.pathname}${location.search}`;
    const currentPathslices = currentPath.split('/');
    currentPathslices[1] = language;
    const newPath = currentPathslices.join('/');
    const newUrl = location.href.replace(currentPath, newPath);
    this.replaceUrl(newUrl);
  }

  private pushHistoryState(newUrl: string) {
    window.history.pushState({}, null, newUrl);
  }

  private changeLocationHref(newUrl: string) {
    this.windowLocation.assign(newUrl);
  }

  private replaceUrl(newUrl) {
    try {
      this.pushHistoryState(newUrl);
    } catch (error) {
      try { // IE < 10 fallback
        this.changeLocationHref(newUrl);
      } catch { }
    }
  }

}
