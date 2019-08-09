import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppWarpperContentModule } from '../app-warpper-content/app-warpper-content.module';
import { NavbarModule } from '../navbar';
import { AppWrapperPublicComponent } from './app-wrapper-public.component';

@NgModule({
  declarations: [AppWrapperPublicComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    TranslateModule,
    MatButtonModule,
    AppWarpperContentModule,
  ],
  exports: [AppWrapperPublicComponent]
})
export class AppWrapperPublicModule { }
