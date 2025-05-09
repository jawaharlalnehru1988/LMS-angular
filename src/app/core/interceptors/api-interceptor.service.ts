import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    const modifiedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.error(`API Error: ${error.status} - ${error.message}`);
        return throwError(() => new Error("error"));        
      }),
      finalize(()=>{
        console.log(`Completed API Request: ${req.url}`);
      })
    );
  }

}
