import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageServiceTestingModule } from '@services/language/testing';
import { NavbarComponent } from '../navbar.component';
import { NavbarModule } from '../navbar.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    NavbarModule,
    LanguageServiceTestingModule,
    RouterTestingModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarTestingModule { }
