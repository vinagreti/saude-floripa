/* NOTE: Used to run tests with controled config like default and extra languages */
import { I18nLocale } from './../app/models/language';
import { AppEnvironment } from './env-base';

// !!!: DO NOT CHANGE avoid changing this configuratin as it is used by tests to produce the desired results (like testing wrong locales)
export const environment: AppEnvironment = {
  appName: 'deniz',
  basePath: '',
  debug: false,
  defaultLanguage: I18nLocale.EN,
  extraLanguages: [I18nLocale.PT],
  name: 'testing',
  serverPort: 8000,
  production: true,
};
