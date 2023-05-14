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
import { Router } from '@angular/router';


/**

AuthInterceptor is an HTTP interceptor that intercepts HTTP requests and adds a bearer token
to the headers of the request if the user is logged in. It also handles errors and logs the user out if there is an unauthorized error
@class AuthInterceptor
@implements {HttpInterceptor}
*/

@Injectable()
class AuthInterceptor implements HttpInterceptor {

  /**

Creates an instance of AuthInterceptor
@param {AuthenticationService} authService - An instance of the AuthenticationService
@param {Router} router - An instance of the Angular Router
@memberof AuthInterceptor
*/

  constructor(private authService: AuthenticationService, private router: Router) {}

  /**

Intercepts HTTP requests and adds a bearer token to the headers if the user is logged in.
It also handles errors and logs the user out if there is an unauthorized error.
@param {HttpRequest<unknown>} request - The HTTP request
@param {HttpHandler} next - The HTTP handler
@returns {Observable<HttpEvent<unknown>>} An observable of the HTTP event
@memberof AuthInterceptor
*/

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

        if(error.status === 500) this.router.navigateByUrl('/500')

        return throwError(() => error);
      })
    );
  }
}

/**

AuthInterceptorProvider is a provider that provides an instance of AuthInterceptor as an HTTP_INTERCEPTOR
@export
@const AuthInterceptorProvider
@type {Provider}
*/

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
