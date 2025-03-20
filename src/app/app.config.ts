import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiInterceptorService } from './core/interceptors/api-interceptor.service';
export function checkRegistration():()=>Promise<void>{
  const isRegitsted = localStorage.getItem('isRegistered');
  if(!isRegitsted){
    window.location.href = '/login';
}
return ()=>Promise.resolve();
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptorsFromDi()), {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true}]
};
