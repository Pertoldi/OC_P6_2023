import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { getHeader } from './header';
import { Observable } from 'rxjs';
import { ISubsciption } from '../model/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  apiUrl = `${API_BASE_URL}/subscription`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  subscribe(subjectId: number): Observable<ISubsciption> {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.post<ISubsciption>(`${this.apiUrl}`, { subjectId }, { headers });
  }

  unsubscribe(subjectId: number): Observable<{ message: string }> {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${subjectId}`, { headers });
  }

  getAll(): Observable<ISubsciption[]> {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.get<ISubsciption[]>(`${this.apiUrl}`, { headers });
  }
}
