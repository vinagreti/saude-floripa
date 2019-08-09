import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () =>  import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'home2', loadChildren: () =>  import('./home/home.module').then(mod => mod.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }
