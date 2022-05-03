import { LoaderService } from './../components/loader/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token) {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next
        .handle(cloneReq)
        .pipe(finalize(() => this.loaderService.hide()));
    } else {
      return next
        .handle(request)
        .pipe(finalize(() => this.loaderService.hide()));
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
