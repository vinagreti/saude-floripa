import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppWrapperNonAuthComponent } from '@components/layout/app-wrapper-non-auth/app-wrapper-non-auth.component';
import { AppWrapperNonAuthModule } from '@components/layout/app-wrapper-non-auth/app-wrapper-non-auth.module';
import { AppWrapperPrivateComponent } from '@components/layout/app-wrapper-private/app-wrapper-private.component';
import { AppWrapperPrivateModule } from '@components/layout/app-wrapper-private/app-wrapper-private.module';
import { AppWrapperPublicComponent } from '@components/layout/app-wrapper-public/app-wrapper-public.component';
import { AppWrapperPublicModule } from '@components/layout/app-wrapper-public/app-wrapper-public.module';
import { AuthGuard, AuthGuardModule } from '@services/guards/auth';
import { NonAuthGuard, NonAuthGuardModule } from '@services/guards/non-auth';

/* NOTE: Add the pages routes here */
const routes: Routes = [
  {
    path: '',
    component: AppWrapperPublicComponent,
    loadChildren: () =>  import('./public/public-pages.module').then(mod => mod.PublicPagesModule)
  }, {
    path: '',
    component: AppWrapperPrivateComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>  import('./private/private-pages.module').then(mod => mod.PrivatePagesModule)
  }, {
    path: '',
    component: AppWrapperNonAuthComponent,
    canActivate: [NonAuthGuard],
    loadChildren: () =>  import('./non-auth/non-auth-pages.module').then(mod => mod.NonAuthPagesModule)
  },
  { path: '**', loadChildren: () =>  import('./static/not-found-page/not-found-page.module').then(mod => mod.NotFoundPageModule) },
];

@NgModule({
  imports: [
    AppWrapperPublicModule,
    AppWrapperPrivateModule,
    AppWrapperNonAuthModule,
    AuthGuardModule,
    NonAuthGuardModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
