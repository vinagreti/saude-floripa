import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppWarpperContentModule } from '../app-warpper-content/app-warpper-content.module';
import { NavbarModule } from '../navbar';
import { AppWrapperNonAuthComponent } from './app-wrapper-non-auth.component';



@NgModule({
  declarations: [AppWrapperNonAuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    AppWarpperContentModule,
  ],
  exports: [AppWrapperNonAuthComponent]
})
export class AppWrapperNonAuthModule { }
