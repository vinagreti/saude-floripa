import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { appTestingMockReadOnlyProperties } from '@testing/functions';
import { UniversalHttpInterceptorService } from './universal-http-interceptor.service';

const NEXT = {handle: () => {}};

const REQUEST_TOKEN = {
  protocol: 'http',
  hostname: 'test.com',
  url: '/assets/i18n/location-pt.json',
  clone: (token) => JSON.parse(JSON.stringify(token)),
};

describe('UniversalHttpInterceptorService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UniversalHttpInterceptorService,
      ModuleMapLoaderModule,
      { provide: REQUEST, useValue: REQUEST_TOKEN },
    ]
  }));

  it('should create', () => {
    const service: UniversalHttpInterceptorService = TestBed.get(UniversalHttpInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should getBaseUrl with port', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    service.port = 123;
    service.innerRequest = REQUEST_TOKEN;
    const baseUrl = service.getBaseUrl();
    expect(baseUrl).toEqual('http://test.com:123');
  });

  it('should getBaseUrl without port', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    service.innerRequest = REQUEST_TOKEN;
    appTestingMockReadOnlyProperties(process, 'env', {PORT: '123'});
    const baseUrl = service.getBaseUrl();
    expect(baseUrl).toEqual('http://test.com');
  });

  it('should mountI18nFolderPath', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    service.innerRequest = REQUEST_TOKEN;
    service.port = undefined;
    const baseUrl = service.mountI18nFolderPath(REQUEST_TOKEN);
    expect(baseUrl).toEqual('http://test.com/assets/i18n/location-pt.json');
  });

  it('should use the default port', (done) => {
    const processEnv = process.env;
    appTestingMockReadOnlyProperties(process, 'env', undefined);
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    expect(service.port).toEqual(environment.serverPort);
    appTestingMockReadOnlyProperties(process, 'env', processEnv);
    done();
  });

  it('should intercept and not change assets url', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    const incrementSpy = spyOn(NEXT, 'handle').and.callThrough();
    service.intercept(REQUEST_TOKEN, NEXT);
    expect(incrementSpy).toHaveBeenCalled();
  });

  it('should intercept and change assets url', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    const incrementSpy = spyOn(service, 'changeRequestUrl').and.callThrough();
    service.intercept(REQUEST_TOKEN, NEXT);
    expect(incrementSpy).toHaveBeenCalled();
  });

  it('should intercept and not change assets url', () => {
    const service: any = TestBed.get(UniversalHttpInterceptorService);
    const changeRequestUrl = spyOn(service, 'changeRequestUrl').and.callThrough();
    service.intercept(undefined, NEXT);
    expect(changeRequestUrl).not.toHaveBeenCalled();
  });

});
