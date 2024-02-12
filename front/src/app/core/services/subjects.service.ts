import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeader } from './header';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  apiUrl = `${API_BASE_URL}/subject`;


  constructor(
    private http: HttpClient,
    private authService: AuthService

  ) { }

  getById() {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  getAll() {
    const token = this.authService.getToken();

    const headers = getHeader(token);

    return this.http.get(`${this.apiUrl}`, { headers });
  }
}
