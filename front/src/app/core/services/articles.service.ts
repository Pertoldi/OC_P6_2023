import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { AuthService } from './auth.service';
import { SubjectsService } from './subjects.service';
import { getHeader } from './header';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  apiUrl = `${API_BASE_URL}/article`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private subjectsService: SubjectsService

  ) { }


  create(value: { subjectId: number, title: string, content: string }) {
    const token = this.authService.getToken();
    const headers = getHeader(token);

    return this.http.post(`${this.apiUrl}`, { title: value.title, content: value.content, subjectId: value.subjectId }, { headers });

  }

  getAll() {
    const token = this.authService.getToken();

    const headers = getHeader(token);
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getbyId() { }
}
