import { async, TestBed } from '@angular/core/testing';
import { I18nLocale } from '@models/language';
import { Store } from '@ngxs/store';
import { ASetLanguage } from './language.actions';
import { LanguageState, LanguageStateModel } from './language.state';
import { LanguageServiceTestingModule } from './testing';

describe('Language store', () => {
  const newLanguage = I18nLocale.PT;

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LanguageServiceTestingModule
      ]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should set language', () => {
    const expected: LanguageStateModel = {
      language: newLanguage
    };
    store.dispatch(new ASetLanguage(newLanguage));
    const actual = store.selectSnapshot(LanguageState.getState);
    expect(actual).toEqual(expected);
  });
});
