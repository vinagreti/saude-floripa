import { I18nLocale } from './../app/models/language';
import { AppEnvironment } from './env-base';

export const environment: AppEnvironment = {
  appName: 'deniz',
  basePath: '',
  debug: false,
  defaultLanguage: I18nLocale.EN,
  extraLanguages: [I18nLocale.ES, I18nLocale.PT],
  name: 'production',
  serverPort: 80,
  production: true,
};
