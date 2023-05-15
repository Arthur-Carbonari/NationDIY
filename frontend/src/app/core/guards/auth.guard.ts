import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * 
This is an implementation of an Angular route guard named AuthGuard that implements the CanActivate interface to control access to certain routes based on whether the user is authenticated or not.

The AuthGuard is injected with an instance of the AuthenticationService and the Router so it can check the authentication status and redirect the user to the home page if needed.

The canActivate method of the guard is responsible for returning a boolean or a promise/observable that resolves to a boolean indicating whether the user is allowed to access the route or not. In this case, the guard subscribes to the isLoggedIn$ observable of the AuthenticationService and uses the tap operator to redirect the user to the login page if they are not authenticated.

Overall, this implementation of the AuthGuard ensures that only authenticated users can access certain routes in the Angular app, while redirecting unauthenticated users to the home page.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthenticationService, private router: Router){}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(!this.authService.isLoggedIn){
      this.router.navigateByUrl("")
      return false
    }

    return true
  }
  
}
