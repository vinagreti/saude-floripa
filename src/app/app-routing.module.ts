import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouterPreloader, RouterPreloaderModule } from '@services/router/router-preloader';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: () =>  import('./pages/pages.module').then(mod => mod.PagesModule) },
  { path: ':lang', loadChildren: () =>  import('./pages/pages.module').then(mod => mod.PagesModule) }, // server side rendering work around
  { path: '**', loadChildren: () =>  import('./pages/static/not-found-page/not-found-page.module').then(mod => mod.NotFoundPageModule) },
];

@NgModule({
  imports: [
    RouterPreloaderModule,
    RouterModule.forRoot(routes, {preloadingStrategy: AppRouterPreloader}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
