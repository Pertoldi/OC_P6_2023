import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeader } from './header';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../../app.config';
import { Observable } from 'rxjs';
import { ITheme } from '../model/theme.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  apiUrl = `${API_BASE_URL}/subject`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getById(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${this.apiUrl}/user`, { headers: getHeader(this.authService.getToken()) });
  }

  getAll(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${this.apiUrl}`, { headers: getHeader(this.authService.getToken()) });
  }
}
