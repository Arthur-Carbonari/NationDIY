import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


/**

A service that provides authentication functionality.
It uses JWT (JSON Web Token) for authentication and authorization.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly TOKEN_NAME = 'auth-token' 

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  public isLoggedIn$ = this._isLoggedIn$.asObservable()

  private _userId: string = ""

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    this.authenticateUser()
  }

  get authToken(){
    return localStorage.getItem(this.TOKEN_NAME)
  }

  get isLoggedIn(){
    return this._isLoggedIn$.value
  }

  get userId(){
    return this._userId
  }

  private authenticateUser(){
    const token = this.authToken

    if(!token || this.jwtHelper.isTokenExpired(token)){      
      this.logout()
      return 
    }

    this._userId = this.jwtHelper.decodeToken(token).userId
    
    this._isLoggedIn$.next(true)
  }

  signup(email: string, username: string, password: string) {
    return this.httpClient.post<any>('api/auth/signup', { email, username, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_NAME, response.token)
        this.authenticateUser()
      })
    )
  }

  login(emailOrUsername: string, password: string) {
    return this.httpClient.post<any>('api/auth/login', { emailOrUsername, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_NAME, response.token)
        this.authenticateUser()
      })
    )

  }

  checkAvailability(emailOrUsername: string) {
    return this.httpClient.post<any>('api/auth/check-availability', { emailOrUsername })
  }

  logout(){
    localStorage.removeItem(this.TOKEN_NAME)
    this._isLoggedIn$.next(false)
    this._userId = ""
  }
}
