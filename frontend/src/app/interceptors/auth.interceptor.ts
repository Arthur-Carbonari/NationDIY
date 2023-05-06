import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = this.authService.authToken

    if(authToken){
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${authToken}`) })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // if user is logged in and there is an unauthorized error, log user out and redirect to login page
        if (this.authService.isLoggedIn && (error.status === 401 || error.status === 403)) {
          this.authService.logout();
        }

        return throwError(() => error);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
