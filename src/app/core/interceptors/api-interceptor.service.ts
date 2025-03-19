import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('req :', req);
    console.log('req :', req.body);

    const modifiedReq = req.clone({
      setHeaders:{
        'Content-Type':'application/json'
      }
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
