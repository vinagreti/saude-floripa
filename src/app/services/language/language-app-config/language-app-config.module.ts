import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguageAppConfigService } from './language-app-config.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LanguageAppConfigService
  ],
})
export class LanguageAppConfigModule { }
