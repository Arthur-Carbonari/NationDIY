import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signup(email: string, username: string, password: string) {
    return this.httpClient.post<any>('api/auth/signup', { email, username, password }).pipe(
      map((response) => {
        localStorage.setItem('auth-token', response.token)
        return response
      })
    )
  }

  login(emailOrUsername: string, password: string) {
    return this.httpClient.post<any>('api/auth/login', { emailOrUsername, password }).pipe(
      map((response) => {
        localStorage.setItem('auth-token', response.token)
        return response
      })
    )

  }

  checkAvailability(emailOrUsername: string){
    return this.httpClient.post<any>('api/auth/check-availability', { emailOrUsername })
  }
}
