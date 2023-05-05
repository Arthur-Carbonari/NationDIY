import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly TOKEN_NAME = 'auth-token' 

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  public isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private httpClient: HttpClient) {
    this._isLoggedIn$.next(!!this.authToken)
  }

  get authToken(){
    return localStorage.getItem(this.TOKEN_NAME)
  }

  signup(email: string, username: string, password: string) {
    return this.httpClient.post<any>('api/auth/signup', { email, username, password }).pipe(
      tap((response) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem(this.TOKEN_NAME, response.token)
      })
    )
  }

  login(emailOrUsername: string, password: string) {
    return this.httpClient.post<any>('api/auth/login', { emailOrUsername, password }).pipe(
      tap((response) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem(this.TOKEN_NAME, response.token)
      })
    )

  }

  checkAvailability(emailOrUsername: string) {
    return this.httpClient.post<any>('api/auth/check-availability', { emailOrUsername })
  }

  logout(){
    localStorage.removeItem("auth-token")
    this._isLoggedIn$.next(false)
  }
}
