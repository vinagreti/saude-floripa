import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from '@env/environment';
import { I18nLocale } from '@models/language';
import { LanguageService } from './language.service';

export function getAppGenericLanguageFromLocale(lang: string): I18nLocale {
  if (lang) {
    if (lang.length > 1) {
      return lang.substr(0, 2) as I18nLocale;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function isLanguageUsedByThisApp(lang: I18nLocale) {
  return [environment.defaultLanguage, ...environment.extraLanguages].includes(lang as I18nLocale);
}

export function getAppGenericaLanguage(lang: string): I18nLocale {
  const genericLanguage = getAppGenericLanguageFromLocale(lang);
  const languageIsValid = isLanguageUsedByThisApp(genericLanguage);
  if (languageIsValid) {
    return genericLanguage;
  } else {
    return undefined;
  }
}

function recursivelyRegisterLocales(languages: I18nLocale[]) {
  return new Promise((resolve, reject) => {
    const language = languages.shift();
    import(`@angular/common/locales/${language}.js`).then(locale => {
      import(`@angular/common/locales/extra/${language}.js`).then(extras => {
        registerLocaleData(locale.default, language, extras.default);
        if (languages.length) {
          recursivelyRegisterLocales(languages).then(() => resolve());
        } else {
          resolve();
        }
      });
    });
  });
}

export function importAppEnabledLanguagesLocales() {
  const enabledLanguages = [environment.defaultLanguage, ...environment.extraLanguages];
  return recursivelyRegisterLocales(enabledLanguages);
}

export const AppLanguageLocaleInitializer = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    return () => {
      return importAppEnabledLanguagesLocales();
    };
  },
  deps: [],
  multi: true,
};

export function getBrowserLocale() {
  let browserLocale: string;
  try {
    const browserConfig = navigator as any;
    if (browserConfig.languages && browserConfig.languages.length) {
      browserLocale = browserConfig.languages[0];
    } else {
      browserLocale =  browserConfig.userLanguage || browserConfig.language || browserConfig.browserLanguage;
    }
  } catch { }
  return browserLocale;
}

export function languageLocaleIdFactory(languageService: LanguageService) {
  return languageService.language;
}
