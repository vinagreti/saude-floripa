import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { I18nLocale } from '@models/language';
import { LanguageService } from '@services/language';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  i18nLocales = [environment.defaultLanguage, ...environment.extraLanguages];

  language$: Observable<I18nLocale>;

  languages = I18nLocale;

  @Input() titleLink = '/';

  constructor(
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.language$ = this.languageService.language$;
  }

  setLanguage(lang: I18nLocale) {
    return this.languageService.setLanguage(lang);
  }

}
