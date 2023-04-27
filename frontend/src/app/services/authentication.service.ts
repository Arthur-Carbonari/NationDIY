import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  register(){}

  login(emailOrUsername: string, password: string) {
    return this.httpClient.post<any>('api/auth/login', { emailOrUsername, password }).pipe(
      map((response) => {
        localStorage.setItem('auth-token', response.token)
        return response
      })
    )

  }
}
