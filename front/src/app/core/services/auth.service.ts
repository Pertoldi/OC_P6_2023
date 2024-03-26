import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHeader } from './header';

@Injectable({ providedIn: 'root' })
export class AuthService {

  apiUrl = `${API_BASE_URL}/auth`;
  constructor(private http: HttpClient) {

  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: { email: string, name: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  updateProfile(credentials: { email: string, name: string }) {
    const token = this.getToken();
    const headers = getHeader(token);
    return this.http.put(`${this.apiUrl}/me`, credentials, { headers });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : "";
  }

  getMe(): Observable<any> { // TODO changer tout les any
    const token = this.getToken();
    const headers = getHeader(token);

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  disconnect(): void {
    localStorage.removeItem('token');

  }
}
