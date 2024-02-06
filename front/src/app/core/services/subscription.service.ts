import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { getHeader } from './header';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  apiUrl = `${API_BASE_URL}/subscription`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  subscribe(subjectId: number) {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.post(`${this.apiUrl}`, { subjectId }, { headers })
  }

  unsubscribe(subjectId: number) {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.delete(`${this.apiUrl}/${subjectId}`, { headers })
  }

  getAll() {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.get(`${this.apiUrl}`, { headers })
  }
}
