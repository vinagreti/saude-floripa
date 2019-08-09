import { I18nLocale } from '@models/language';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ASetLanguage } from './language.actions';

export interface LanguageStateModel {
  language: I18nLocale;
}

@State<LanguageStateModel>({
  name: 'language',
  defaults: {
    language: undefined
  }
})
export class LanguageState {

  @Selector()
  public static getState(state: LanguageStateModel) {
    return state;
  }

  @Selector()
  public static language(state: LanguageStateModel) {
    return state.language;
  }

  @Action(ASetLanguage)
  public add(ctx: StateContext<LanguageStateModel>, { language }: ASetLanguage) {
    ctx.patchState({language});
  }
}
