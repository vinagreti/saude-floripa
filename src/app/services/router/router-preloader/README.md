# App Router Preloader

It uses the data property of router paths to decide when a route should be preloaded

```javascript

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppCustomPreloader } from './app-routing-loader';
import { Feature1Component } from './feature-1/feature-1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feature-1',
    pathMatch: 'full'
  },
  {
    path: 'feature-1',
    component: Feature1Component
  },
  {
    path: 'feature-2',
    loadChildren: './feature-2/feature-2.module#Feature2Module',
    data: { preload: true }  // Custom property we will use to track what route to be preloaded
  },
  {
    path: 'feature-3',
    loadChildren: './feature-3/feature-3.module#Feature3Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })], // Using our own custom preloader
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
```
credits: https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular
