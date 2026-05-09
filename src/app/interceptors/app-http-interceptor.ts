import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../services/auth';
import { Observable } from "rxjs";



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private auth : Auth) {}
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.includes('auth/login')){
      let newreq  = req.clone({headers : req.headers.set('Authorization', 'Bearer ' + this.auth.accessToken)});
      return next.handle(newreq);
    }
    else return next.handle(req);
  }



  }

