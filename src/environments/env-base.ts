import { I18nLocale } from './../app/models/language';

export interface AppEnvironment {
  appName: string;
  basePath: string;
  debug: boolean;
  defaultLanguage: I18nLocale;
  extraLanguages: I18nLocale[];
  name: string;
  production: boolean;
  serverPort: number;
  [key: string]: any;
}

export const EnvBaseConfig: AppEnvironment = {
  appName: 'deniz',
  basePath: '',
  debug: false,
  defaultLanguage: I18nLocale.EN,
  extraLanguages: [],
  name: 'BaseEnvironment',
  serverPort: 4200,
  production: false,
};
