import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { UniversalHttpInterceptorService } from '@services/universal';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalHttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
