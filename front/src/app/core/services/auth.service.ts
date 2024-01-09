import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = `${API_BASE_URL}/auth`;
  constructor(private http: HttpClient) {

  }

  login(credentials: { email: string; password: string }) {
    console.log('credentials is :', credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
