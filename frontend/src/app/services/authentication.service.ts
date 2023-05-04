import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  public isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem("auth-token")
    this._isLoggedIn$.next(!!token)
  }

  signup(email: string, username: string, password: string) {
    return this.httpClient.post<any>('api/auth/signup', { email, username, password }).pipe(
      tap((response) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('auth-token', response.token)
      })
    )
  }

  login(emailOrUsername: string, password: string) {
    return this.httpClient.post<any>('api/auth/login', { emailOrUsername, password }).pipe(
      tap((response) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('auth-token', response.token)
      })
    )

  }

  checkAvailability(emailOrUsername: string) {
    return this.httpClient.post<any>('api/auth/check-availability', { emailOrUsername })
  }
}
