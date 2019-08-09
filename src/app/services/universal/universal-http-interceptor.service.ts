import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import * as express from 'express';

@Injectable()
export class UniversalHttpInterceptorService implements HttpInterceptor {

  private port = (process && process.env) ? process.env.PORT : environment.serverPort;

  constructor(@Inject(REQUEST) private innerRequest: express.Request) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const isrelativePath = request && request.url && request.url.startsWith('/');

    if (isrelativePath) {
      const newRequest = this.changeRequestUrl(request);
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }

  private changeRequestUrl(request) {
    return request.clone({
      url: this.mountI18nFolderPath(request)
    });
  }

  private mountI18nFolderPath(request: HttpRequest<any>) {
    const baseUrl = this.getBaseUrl();
    const finalUrl = `${baseUrl}${request.url}`;
    return finalUrl;
  }

  private getBaseUrl() {
    const { protocol, hostname } = this.innerRequest;
    return this.port ? `${protocol}://${hostname}:${this.port}` : `${protocol}://${hostname}`;
  }
}
