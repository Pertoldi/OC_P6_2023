import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHeader } from './header';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  apiUrl = `${API_BASE_URL}/auth`;
  constructor(private http: HttpClient) {

  }
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: { email: string, name: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, credentials);
  }

  updateProfile(credentials: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, credentials, { headers: getHeader(this.getToken()) });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : "";
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { headers: getHeader(this.getToken()) });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  disconnect(): void {
    localStorage.removeItem('token');
  }
}
