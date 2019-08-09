import { ChangeDetectionStrategy, Component } from '@angular/core';
import { I18nLocale } from '@models/language';
import { LanguageService } from '@services/language';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  today = Date.now();

  language$: Observable<I18nLocale>;

  constructor(
    private languaService: LanguageService,
  ) {
    this.language$ = this.languaService.language$;
  }

}
