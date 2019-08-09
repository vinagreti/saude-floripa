import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NonAuthGuard } from './non-auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NonAuthGuard
  ],
})
export class NonAuthGuardModule { }
