import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppWarpperContentModule } from '../app-warpper-content/app-warpper-content.module';
import { NavbarModule } from '../navbar';
import { AppWrapperPrivateComponent } from './app-wrapper-private.component';

@NgModule({
  declarations: [AppWrapperPrivateComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    MatButtonModule,
    TranslateModule,
    MatMenuModule,
    AppWarpperContentModule,
  ],
  exports: [AppWrapperPrivateComponent]
})
export class AppWrapperPrivateModule { }
